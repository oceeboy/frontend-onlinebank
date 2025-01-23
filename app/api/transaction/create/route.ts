import { TransactionStatus, TransactionType } from "@/constants/index.enum";
import connectToDatabase from "@/lib/db";
import Transaction from "@/model/Transaction";
import User, { UserDocument } from "@/model/User";

import { CreateTransactionDto } from "@/types/dto/create-transaction.dto";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

// Helper: Validate enum values
function validateEnum(
  value: string | number,
  validValues: (string | number)[],
  fieldName: string
): void {
  if (!validValues.includes(value)) {
    throw new Error(
      `Invalid ${fieldName}. Allowed values: ${validValues.join(", ")}`
    );
  }
}

// Helper: Find user and validate account status
async function findAndValidateUser(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.accountStatus !== "active")
    throw new Error("User account is not active");
  return user;
}

// Helper: Validate last transaction timing
async function validateLastTransactionTiming(userId: string) {
  const lastTransaction = await Transaction.find({ userId })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  if (lastTransaction.length > 0) {
    const lastTransactionTime = new Date(
      lastTransaction[0].createdAt
    ).getTime();
    const timeDiff = Date.now() - lastTransactionTime;
    const THREE_MINUTES_IN_MS = 3 * 60 * 1000;

    if (timeDiff < THREE_MINUTES_IN_MS) {
      throw new Error("Transactions can only be made 3 minutes apart");
    }
  }
}

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    type,
    amount,
    code,
    status,
    iban,
    bic,
    narration,
    bankAddress,
    recipientBankName,
    recipientName,
  }: CreateTransactionDto = await req.json();

  try {
    const decodedToken = verify(token, process.env.JWT_SECRET!);
    const userId = decodedToken.sub;

    await connectToDatabase();

    if (typeof userId !== "string") {
      throw new Error("Invalid token payload");
    }
    const user: UserDocument = await findAndValidateUser(userId);

    if (!user.kycVerified) {
      if (!code) {
        return NextResponse.json(
          {
            error: "Transaction code is required because KYC is not completed",
          },
          { status: 400 }
        );
      }
      if (user.code !== code) {
        return NextResponse.json(
          { error: "Invalid transaction code. Please contact bank support" },
          { status: 400 }
        );
      }
    }

    await validateLastTransactionTiming(userId);

    // Validate enums
    validateEnum(type, Object.values(TransactionType), "transaction type");
    validateEnum(
      status,
      Object.values(TransactionStatus),
      "transaction status"
    );

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Transaction amount must be greater than zero" },
        { status: 400 }
      );
    }

    // Update balance and create transaction
    const session = await User.startSession();
    session.startTransaction();

    if (type === TransactionType.DEPOSIT) {
      user.balance += amount;
    } else if (type === TransactionType.WITHDRAWAL) {
      if (user.balance < amount) {
        throw new Error("Insufficient funds");
      }
      user.balance -= amount;
    }
    await user.save({ session });

    const newTransaction = new Transaction({
      userId: user._id,
      type,
      amount,
      status,
      code,
      narration,
      iban,
      bic,
      bankAddress,
      recipientBankName,
      recipientName,
      transactionDate: Date.now(),
    });

    await newTransaction.save({ session });

    await session.commitTransaction();

    return NextResponse.json(
      { transaction: newTransaction, balance: user.balance },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

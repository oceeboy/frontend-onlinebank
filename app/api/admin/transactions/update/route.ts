import connectToDatabase from "@/lib/db";
import Transaction from "@/model/Transaction";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { transactionId, updates } = await request.json();

  try {
    await connectToDatabase();
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    Object.assign(transaction, updates);
    await transaction.save();

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

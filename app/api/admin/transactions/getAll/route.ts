import connectToDatabase from "@/lib/db";
import Transaction, { ITransaction } from "@/model/Transaction";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

// Get all transactions of a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Ensure userId is a valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch all transactions for the user
    const transactions: ITransaction[] = await Transaction.find({
      userId: new Types.ObjectId(userId),
    }).exec();

    // Return the transactions
    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message || "An error occurred",
      },
      { status: 500 }
    );
  }
}

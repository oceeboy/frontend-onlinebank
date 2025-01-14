import connectToDatabase from "@/lib/db";
import Transaction from "@/model/Transaction";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json(
        { message: "Transaction ID is required to delete the profile" },
        { status: 400 }
      );
    }
    await connectToDatabase();

    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found to delete details" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

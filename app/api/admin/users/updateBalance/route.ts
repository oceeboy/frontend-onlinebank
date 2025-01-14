import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { userId, newBalance } = await request.json();

    if (newBalance < 0) {
      return NextResponse.json(
        {
          message: "Balance cannot be zero",
        },
        {
          status: 400,
        }
      );
    }
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }
    user.balance = newBalance;
    await user.save();
    return NextResponse.json(
      { message: "Balance Updated Successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

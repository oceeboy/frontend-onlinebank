import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { userId, newCode } = await request.json();
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.code = newCode;
    await user.save();
    return NextResponse.json(
      // user this is to return the currrent user update info
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

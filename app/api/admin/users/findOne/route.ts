import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    await connectToDatabase();
    const user = await User.findById(userId);
    //handling the state of a user not found
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
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

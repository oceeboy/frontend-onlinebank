import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required to delete the profile" },
        { status: 400 }
      );
    }
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found to delete profile" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
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

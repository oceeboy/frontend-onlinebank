import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/db";
import User from "@/model/User";

export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
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

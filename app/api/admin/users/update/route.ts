import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/model/User";

export async function PUT(request: Request) {
  const { userId, updates } = await request.json();

  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    Object.assign(user, updates);
    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

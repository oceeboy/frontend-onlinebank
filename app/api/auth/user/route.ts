import connectToDatabase from "@/lib/db";
import User, { UserDocument } from "@/model/User";

import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decodedToken = verify(token, process.env.JWT_SECRET!);
    const userId = decodedToken.sub;

    await connectToDatabase();

    // Find user by ID
    const user = (await User.findById(userId)) as UserDocument | null;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data (exclude password for security and others)
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve user details" },
      { status: 500 }
    );
  }
}

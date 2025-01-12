import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { LoginUserDto } from "@/types/dto/login.dto";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  const loginUser: LoginUserDto = await req.json();
  const { email, password } = loginUser;

  try {
    // Connect to DB
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password with the hashed one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return NextResponse.json({
      user_details: user,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}

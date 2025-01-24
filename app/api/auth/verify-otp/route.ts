import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  try {
    // Connect to DB
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if OTP is valid
    const isOtpValid = user.otp === otp && user.otpExpiresAt > new Date();
    if (!isOtpValid) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return NextResponse.json({
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken,
      user_details: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}

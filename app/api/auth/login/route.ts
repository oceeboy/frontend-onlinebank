import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { LoginUserDto } from "@/types/dto/login.dto";
// import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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

    //Generatee otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;

    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // for 10 mintues

    await user.save();

    // sent code to email

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL_FOR_NODEMAILER, // Your email
        pass: process.env.MAILER_PASSORD_FOR_NODEMAILER, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
    });

    return NextResponse.json({
      message: `OTP sent to your email`,
    });
  } catch {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}

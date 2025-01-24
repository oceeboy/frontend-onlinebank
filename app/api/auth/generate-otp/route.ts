import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Connect to DB
    await connectToDatabase();

    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in user's document
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL_FOR_NODEMAILER, // Your email
        pass: process.env.MAILER_PASSORD_FOR_NODEMAILER, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.MAILER_EMAIL_FOR_NODEMAILER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
    });

    return NextResponse.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate OTP" },
      { status: 500 }
    );
  }
}

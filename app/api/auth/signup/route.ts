import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { RegisterUserDto } from "@/types/dto/register.dto";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

async function generateUniqueAccountNumber(): Promise<number> {
  let accountNumber: number = 0;
  let isUnique = false;

  while (!isUnique) {
    accountNumber = Math.floor(100000000 + Math.random() * 900000000); // 9 digits

    // Check if it exists in the user collection already
    const existingUser = await User.findOne({ accountNumber });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return accountNumber;
}

export async function POST(req: Request) {
  const registerUser: RegisterUserDto = await req.json();
  const { email, password, ...rest } = registerUser;

  try {
    // Connect to DB
    await connectToDatabase();

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Generate a unique account number
    const accountNumber = await generateUniqueAccountNumber();

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      ...rest,
      accountNumber,
    });

    const savedUser = await newUser.save();

    const accessToken = generateAccessToken(savedUser);
    const refreshToken = generateRefreshToken(savedUser);

    return NextResponse.json({
      user_details: savedUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}

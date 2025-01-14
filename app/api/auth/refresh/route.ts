import connectToDatabase from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "@/utils/jwt";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token is required" },
      { status: 400 }
    );
  }

  try {
    // Verify the refresh token
    const decoded = verify(refreshToken, process.env.JWT_SECRET!) as JwtPayload;

    // Connect to the database
    await connectToDatabase();

    // Fetch the user associated with the token
    const user = await User.findById(decoded.sub);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}

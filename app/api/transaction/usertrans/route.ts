import connectToDatabase from "@/lib/db";
import Transaction from "@/model/Transaction";
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

    const transactions = await Transaction.find({ userId }).exec();

    return NextResponse.json(transactions, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

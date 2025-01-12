import { UserDocument } from "@/model/User";
import { sign } from "jsonwebtoken";

const generateAccessToken = (user: UserDocument): string => {
  const payload = { email: user.email, sub: user._id, role: user.role };
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.ACCESSTOKENEXPIRATION,
  });
};

const generateRefreshToken = (user: UserDocument): string => {
  const payload = { sub: user._id };
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.REFRESHTOKENEXPIRATION,
  });
};

export { generateAccessToken, generateRefreshToken };

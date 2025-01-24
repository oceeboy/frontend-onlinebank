import { signInSchema, signUpSchema, verifyOtp } from "@/schemas/auth.schema";
import { z } from "zod";

type SignUpSchema = z.infer<typeof signUpSchema>;
type SignInSchema = z.infer<typeof signInSchema>;
type VerifyOtp = z.infer<typeof verifyOtp>;

export type { SignUpSchema, SignInSchema, VerifyOtp };

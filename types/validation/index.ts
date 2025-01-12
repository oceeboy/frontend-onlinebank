import { signInSchema, signUpSchema } from "@/schemas/auth.schema";
import { z } from "zod";

type SignUpSchema = z.infer<typeof signUpSchema>;
type SignInSchema = z.infer<typeof signInSchema>;

export type { SignUpSchema, SignInSchema };

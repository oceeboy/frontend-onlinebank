import { z } from "zod";

// Define custom error messages
const customMessages = {
  string: {
    min: (min: number) => `Must be at least ${min} characters long.`,
    max: (max: number) => `Must be at most ${max} characters long.`,
    email: "Invalid email format.",
    regex: "Invalid format.",
    otp: "Enter the 6 digit",
  },
  date: "Date must be a valid ISO string in the format YYYY-MM-DDTHH:mm:ss.sssZ.",
};

// Adjusted schema for payload
const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, customMessages.string.min(2))
    .max(255, customMessages.string.max(255)),
  lastName: z
    .string()
    .min(2, customMessages.string.min(2))
    .max(255, customMessages.string.max(255)),
  email: z.string().email(customMessages.string.email),
  dateOfBirth: z.string().min(1, customMessages.date),
  password: z
    .string()
    .min(8, customMessages.string.min(8))
    .max(128, "Password must be at most 128 characters long."),
  address: z.object({
    street: z
      .string()
      .min(2, customMessages.string.min(2))
      .max(255, customMessages.string.max(255)),
    city: z
      .string()
      .min(2, customMessages.string.min(2))
      .max(255, customMessages.string.max(255)),
    state: z
      .string()
      .min(2, customMessages.string.min(2))
      .max(255, customMessages.string.max(255)),
    postalCode: z
      .string()
      .min(2, customMessages.string.min(2))
      .max(255, customMessages.string.max(255)),
  }),
});

// Export schemas and validation utility

const signInSchema = z.object({
  email: z.string().email(customMessages.string.email),
  password: z
    .string()
    .min(8, customMessages.string.min(8))
    .max(128, "Password must be at most 128 characters long."),
});

const verifyOtp = z.object({
  email: z.string().email(customMessages.string.email),
  otp: z.string().min(6, customMessages.string.min(6)),
});

// Example error handling utility
const validateSchema = (schema: z.ZodTypeAny, data: unknown) => {
  try {
    schema.parse(data);
    return { success: true, data: null };
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorMessages = e.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));
      return { success: false, errors: errorMessages };
    }
    throw e; // Unexpected error
  }
};

// Export schemas and validation utility
export { signUpSchema, signInSchema, validateSchema, verifyOtp };

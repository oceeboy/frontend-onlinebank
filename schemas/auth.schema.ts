import { z } from "zod";

// Define custom error messages
const customMessages = {
  string: {
    min: (min: number) => `Must be at least ${min} characters long.`,
    max: (max: number) => `Must be at most ${max} characters long.`,
    email: "Invalid email format.",
    regex: "Invalid format.",
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
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      customMessages.date
    ),
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
export { signUpSchema, signInSchema, validateSchema };

/**
 * This schema file defines the validation schemas for the sign-up and sign-in forms.
 * It also includes a utility function to validate data against a schema.
 * @packageDocumentation
 * @module schemas/auth
 * @Example
 * const formData = {
  firstName: "J",
  lastName: "Doe",
  email: "invalid-email",
  dateOfBirth: "2025-01-02T03:29:33.943Z",
  password: "1234567",
  state: "CA",
  street: "123 Elm St",
  city: "Somewhere",
  postalCode: "90210",
};

const result = validateSchema(SignUpSchema, formData);

if (!result.success) {
  console.error("Validation errors:", result.errors);
} else {
  console.log("Validation passed!");
}
 */

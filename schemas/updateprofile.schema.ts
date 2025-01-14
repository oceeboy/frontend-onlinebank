import { z } from "zod";

const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
  }),
  balance: z.number(),
  accountStatus: z.enum(["active", "closed"]),
  accountType: z.enum(["savings", "checking", "business"]),
  currency: z.enum([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "DEM",
  ]),
  code: z
    .string()
    .min(5, "minimum of 5 unique digits")
    .max(5, "enter 5 unique digits admin"),
});

export { updateProfileSchema };

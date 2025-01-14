import { updateProfileSchema } from "@/schemas/updateprofile.schema";
import { z } from "zod";

type UpdateProfile = Partial<z.infer<typeof updateProfileSchema>>;

export type { UpdateProfile };

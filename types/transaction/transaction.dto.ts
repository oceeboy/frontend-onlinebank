import { transactionSchema } from "@/schemas/transaction.schema";
import { z } from "zod";

type CreateTransactionDto = z.infer<typeof transactionSchema>;
type UpdateTransactionDto = Partial<CreateTransactionDto>;

export type { CreateTransactionDto, UpdateTransactionDto };

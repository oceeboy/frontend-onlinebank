import { transactionSchema } from "@/schemas/transaction.schema";
import { updateTransactionInfos } from "@/schemas/updatetransaction.schema";
import { z } from "zod";

type CreateTransactionDto = z.infer<typeof transactionSchema>;
type UpdateTransactionDto = z.infer<typeof updateTransactionInfos>;

export type { CreateTransactionDto, UpdateTransactionDto };

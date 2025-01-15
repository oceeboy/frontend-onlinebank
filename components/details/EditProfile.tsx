"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schemas/transaction.schema";
import { UpdateTransactionDto } from "@/types/transaction/transaction.dto";
import { FormField } from "../wrapper/FormField";
import { Transaction } from "@/types";
import { useUpdateTransaction } from "@/hooks/admin/useAdmin";

function ProfileForm({
  className,
  data,
  setState,
}: {
  className: string;
  data: Transaction;
  setState: (value: boolean) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTransactionDto>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: data?.type,
      amount: data?.amount,
      status: data?.status,
      narration: data?.narration,
      iban: data?.iban,
      bic: data?.bic,
      recipientName: data?.recipientName,
      recipientBankName: data.recipientBankName,
      bankAddress: data.bankAddress,
    },
  });
  const { mutate } = useUpdateTransaction();

  const isSubmit = (ddata: UpdateTransactionDto) => {
    mutate({ transactionId: data._id, updates: ddata });
    setState(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(isSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <FormField
            control={control}
            name="amount"
            label="Amount"
            placeholder="Enter the amount"
            required
            errorMessage={errors.amount?.message}
            inputStyle={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
            textParseInt
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={control}
            name="status"
            label="Status"
            placeholder="Enter the status"
            required
            errorMessage={errors.status?.message}
            inputStyle={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>

        <Button
          type="submit"
          className="border bg-bankGradient text-white"
          style={{ marginTop: "1rem" }}
        >
          Save Changes
        </Button>
      </form>
    </>
  );
}

export default ProfileForm;

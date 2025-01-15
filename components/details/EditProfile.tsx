"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTransactionDto } from "@/types/transaction/transaction.dto";
import { FormField } from "../wrapper/FormField";
import { Transaction } from "@/types";
import { useUpdateTransaction } from "@/hooks/admin/useAdmin";
import { updateTransactionInfos } from "@/schemas/updatetransaction.schema";

function ProfileForm({
  className = "",
  data = {} as Transaction,
  setState = () => {},
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
    resolver: zodResolver(updateTransactionInfos),
    defaultValues: {
      type: data?.type || "",
      amount: data?.amount || 0,
      status: data?.status || "",
      narration: data?.narration || "",
      iban: data?.iban || "",
      bic: data?.bic || "",
      recipientName: data?.recipientName || "",
      recipientBankName: data?.recipientBankName || "",
      bankAddress: data?.bankAddress || "",
      code: data?.code || "",
    },
  });
  const { mutate } = useUpdateTransaction();

  const isSubmit = (ddata: UpdateTransactionDto) => {
    mutate({ transactionId: data._id, updates: ddata });
    setState(false);
  };

  return (
    <form
      onSubmit={handleSubmit(isSubmit)}
      className={cn("grid items-start gap-4", className)}
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div className="grid gap-2">
        <FormField
          control={control}
          name="type"
          label="Type"
          placeholder="Enter the transaction type"
          required
          errorMessage={errors.type?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="amount"
          label="Amount"
          placeholder="Enter the amount"
          required
          errorMessage={errors.amount?.message}
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
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="narration"
          label="Narration"
          placeholder="Enter the narration"
          required
          errorMessage={errors.narration?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="iban"
          label="IBAN"
          placeholder="Enter the IBAN"
          required
          errorMessage={errors.iban?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="bic"
          label="BIC"
          placeholder="Enter the BIC"
          required
          errorMessage={errors.bic?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="recipientName"
          label="Recipient Name"
          placeholder="Enter the recipient's name"
          required
          errorMessage={errors.recipientName?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="recipientBankName"
          label="Recipient Bank Name"
          placeholder="Enter the recipient's bank name"
          required
          errorMessage={errors.recipientBankName?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="bankAddress"
          label="Bank Address"
          placeholder="Enter the bank address"
          required
          errorMessage={errors.bankAddress?.message}
        />
      </div>

      <div className="grid gap-2">
        <FormField
          control={control}
          name="code"
          label="Code"
          placeholder="Enter the code"
          required
          errorMessage={errors.code?.message}
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
  );
}

export default ProfileForm;

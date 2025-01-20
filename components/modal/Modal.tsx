"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onSubmit: (code: string) => void;
  errorMessage?: string;
}

interface FormValues {
  code: string;
}

export default function Modal({ isOpen, onSubmit, errorMessage }: ModalProps) {
  const form = useForm<FormValues>({ defaultValues: { code: "" } });

  if (!isOpen) return null;

  const handleCodeSubmit: SubmitHandler<FormValues> = (data) =>
    onSubmit(data.code);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:max-w-md w-full">
        <form
          onSubmit={form.handleSubmit(handleCodeSubmit)}
          className="space-y-4"
        >
          <label>
            <span className="block text-sm font-medium">Transaction Code</span>
            <input
              {...form.register("code", { required: "Code is required" })}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {form.formState.errors.code && (
              <p className="text-red-500 mt-1">
                {form.formState.errors.code.message}
              </p>
            )}
          </label>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

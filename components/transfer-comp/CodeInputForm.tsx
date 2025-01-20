import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";

interface FormValues {
  code: string;
}

interface CodeInputFormProps {
  onSubmit: (code: string) => void;
}

export function CodeInputForm({ onSubmit }: CodeInputFormProps) {
  const form = useForm<FormValues>({
    defaultValues: { code: "" },
  });

  const handleCodeSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.code);
  };

  return (
    <form onSubmit={form.handleSubmit(handleCodeSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Transaction Code</span>
        <input
          {...form.register("code", {
            required: "Code is required",
            maxLength: 5,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {form.formState.errors.code && (
          <p className="text-red-500 mt-1">
            {form.formState.errors.code.message}
          </p>
        )}
      </label>

      <Button type="submit">Submit Code</Button>
    </form>
  );
}

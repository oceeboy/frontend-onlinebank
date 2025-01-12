import React from "react";
import { useForm } from "react-hook-form";

const SimpleForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  interface FormData {
    amount: string;
  }

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Amount:
        <input {...register("amount")} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;

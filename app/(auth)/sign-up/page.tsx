"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/wrapper/FormField";
import { useAuthentication } from "@/lib/actions/user.actions";
import { signUpSchema } from "@/schemas/auth.schema";
import useAuthStore from "@/store/auth/auth";
import { SignUpSchema } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [isdisabled, setIsDisabled] = React.useState<boolean>(false);
  const [responseMessage, setResponseMessage] = React.useState<string | null>(
    null
  );
  const { data: authData } = useAuthStore();
  const router: AppRouterInstance = useRouter();

  const { register } = useAuthentication();

  // const isdisabled = Object.keys(errors).length > 0;
  const onSubmit = async (data: SignUpSchema) => {
    setIsDisabled(true);
    setResponseMessage(null);

    const result = await register(data);

    if (result.success) {
      if (authData?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } else {
      setResponseMessage("Something went wrong. Please try again.");
    }

    setIsDisabled(false);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-2 ">
          {/* <Image src="/icons/logo.svg" width={34} height={34} alt="legeman Bank" /> */}
          <h1 className="text-26 font-bold font-ibm-plex-serif text-black-1">
            Legeman Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className=" text-24 lg:text-36 font-semibold text-gray-900">
            Sign Up
            <p className="text-16">Please enter your details</p>
          </h1>
        </div>
      </header>

      {/* form below */}
      {/* <div className="flex items-center justify-center min-h-screen bg-blue-100"></div> */}
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* FormField component */}
        <div className="flex gap-5">
          <FormField
            control={control}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            rules={{ required: "First Name is required" }}
            errorMessage={errors.firstName?.message}
          />
          <FormField
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            rules={{ required: "Last Name is required" }}
            errorMessage={errors.lastName?.message}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Enter your Date of Birth"
            dateBox
            rules={{ required: "Date of Birth is required" }}
            errorMessage={errors.dateOfBirth?.message}
          />
          <FormField
            control={control}
            name="address.street"
            label="Street"
            placeholder="Enter your Street"
            rules={{ required: "Street is required" }}
            errorMessage={errors.address?.street?.message}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={control}
            name="address.city"
            label="City"
            placeholder="Enter your City"
            rules={{ required: "City is required" }}
            errorMessage={errors.address?.city?.message}
          />
          <FormField
            control={control}
            name="address.state"
            label="State"
            placeholder="Enter your State"
            rules={{ required: "State is required" }}
            errorMessage={errors.address?.state?.message}
          />
        </div>
        <FormField
          control={control}
          name="address.postalCode"
          label="Postal Code"
          placeholder="Enter your Postal Code"
          rules={{ required: "Postal Code is required" }}
          errorMessage={errors.address?.postalCode?.message}
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          rules={{ required: "Email is required" }}
          errorMessage={errors.email?.message}
        />
        <FormField
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          rules={{ required: "Password is required" }}
          errorMessage={errors.password?.message}
        />
        <Button
          type="submit"
          disabled={isdisabled}
          style={{
            padding: "0.5rem 1rem",
            marginTop: "1rem",
            width: "100%",
          }}
          className="bg-bankGradient text-white text-1xl hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Sign Up
        </Button>
        <footer className="flex justify-center gap-1">
          <p className=" text-14 font-normal text-gray-600">
            Already have an account?
          </p>

          <Link href={"/sign-in"} className=" form-link">
            Sign In
          </Link>
        </footer>
      </form>
      <div>
        <p className="text-14 font-normal text-gray-600">{responseMessage}</p>
      </div>
    </section>
  );
}

export default SignUpPage;

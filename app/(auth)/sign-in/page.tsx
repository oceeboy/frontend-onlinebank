"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/wrapper/FormField";
import { useAuthentication } from "@/lib/actions/user.actions";

import { signInSchema } from "@/schemas/auth.schema";
import useAuthStore from "@/store/auth/auth";
import { SignInSchema } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

// to work on
function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const router: AppRouterInstance = useRouter();

  const [isdisabled, setIsDisabled] = React.useState<boolean>(false);
  const [responseMessage, setResponseMessage] = React.useState<string | null>(
    null
  );

  const { status, data: authData } = useAuthStore();

  if (status === "authenticated") {
    if (authData?.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }

  const { login } = useAuthentication();
  //   const isdisabled = Object.keys(errors).length > 0;
  const onSubmit = async (data: SignInSchema) => {
    setIsDisabled(true);
    setResponseMessage(null);
    const result = await login(data);
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
            Sign In
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
          Sign In
        </Button>
        <footer className="flex justify-center gap-1">
          <p className=" text-14 font-normal text-gray-600">
            Don&apos;t have an account?
          </p>

          <Link href={"/sign-up"} className=" form-link">
            Register
          </Link>
        </footer>
      </form>
      {/* remove and use toaster bellow */}
      <div>
        <p className="text-14 font-normal text-gray-600">{responseMessage}</p>
      </div>
    </section>
  );
}

export default SignInPage;

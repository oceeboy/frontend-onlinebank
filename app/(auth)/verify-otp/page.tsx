"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp } from "@/schemas/auth.schema";
import { VerifyOtp } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthentication } from "@/lib/actions/user.actions";

import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/auth/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import HeaderBox from "@/components/homecomp/HeaderBox";
const VerifyOtpPage = () => {
  const searchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const email = searchParams.get("email") as string;

  const form = useForm<VerifyOtp>({
    resolver: zodResolver(verifyOtp),
    defaultValues: {
      email: email as string,
      otp: "",
    },
  });

  const { data: authData } = useAuthStore();

  const { verifyOtp: verifyData, generateOtp } = useAuthentication();

  async function generateNewOtp() {
    await generateOtp(email);
  }

  async function onSubmit(data: VerifyOtp) {
    const result = await verifyData(data);
    if (result.success) {
      if (authData?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }
  return (
    <section className="auth-form">
      <HeaderBox
        title={"Enter Your OTP"}
        subtext={"Check your email for Otp"}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Button
              className="bg-bankGradient hover:bg-black-1 py-3 text-white"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Button
        onClick={generateNewOtp}
        className="hover:bg-black-2 hover:text-white "
      >
        Resend OTP
      </Button>
    </section>
  );
};

export default VerifyOtpPage;

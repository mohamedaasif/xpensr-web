"use client";

import AuthLeft from "@/app/_components/AuthLeft/AuthLeft";
import { Spinner } from "@/app/_components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { PW_BAR_COLOR, PW_HINT, PW_TEXT_COLOR } from "@/app/_utils/constants";
import { calcStrength, inputCls } from "@/app/_utils/helper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Check, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const emailSchema = z.object({
  email: z.email("Enter a valid email address.").min(1, "Email is required."),
});
type EmailFormInput = z.infer<typeof emailSchema>;

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit code.")
    .regex(/^\d{6}$/, "OTP must contain only numbers."),
});
type OtpFormInput = z.infer<typeof otpSchema>;

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Add at least 1 uppercase letter.")
      .regex(/[a-z]/, "Add at least 1 lowercase letter.")
      .regex(/[0-9]/, "Add at least 1 number.")
      .regex(/[^A-Za-z0-9]/, "Add at least 1 special character."),
    confirmPassword: z.string().min(1, "Re-enter your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type passwordFormInput = z.infer<typeof passwordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.auth);
  const [email, setEmail] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);
  const [step, setStep] = useState(1);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormInput>({
    resolver: zodResolver(emailSchema),
  });

  const {
    control: controlOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch: watchPassword,
  } = useForm<passwordFormInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const pwValue = watchPassword("password", "");

  const handleEmail = async (data: EmailFormInput) => {
    setEmail(data?.email);
    setStep(2);
    // const result = await dispatch(
    //   loginUser({ emailId: data.email, password: data.password }),
    // );
    // if (loginUser.fulfilled.match(result)) {
    //   router.replace("/dashboard");
    // }
  };

  const handleOTP = async (data: OtpFormInput) => {
    console.log("data", data?.otp);
    setStep(3);
  };

  const handlePassword = async (data: passwordFormInput) => {
    console.log("data", data);
    setIsPasswordUpdated(true);
  };

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <AuthLeft variant="forgotPassword" />

      {isPasswordUpdated ? (
        <div className="flex items-center justify-center bg-white px-12 py-10">
          <div className="w-full max-w-sm">
            <div className="w-14 h-14 rounded-full bg-[var(--color-pos-bg)] flex items-center justify-center mx-auto mb-[18px] text-[var(--color-pos)]">
              <Check />
            </div>
            <div className="font-[var(--font-display)] text-[22px] text-[var(--color-ink)] text-center font-medium mb-[6px]">
              Password updated!
            </div>
            <div className="font-[var(--font-ui)] text-[13px] text-[var(--color-ink-3)] text-center font-normal mb-[22px] leading-[1.65]">
              Your password has been updated successfully. You can now sign in
              with your new password.
            </div>
            <button
              className="w-full h-[42px] bg-indigo-600 hover:bg-indigo-800 text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center"
              onClick={() => router.replace("/login")}
            >
              Sign in →
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white px-12 py-10">
          <div className="w-full max-w-sm">
            <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-[0.1em] mb-2">
              {`STEP ${step} of 3`}
            </p>
            <h2 className="font-[var(--font-display)] text-[28px] font-medium tracking-tight text-stone-900 mb-1">
              {step === 1
                ? "Forgot Password?"
                : step === 2
                  ? "Enter the code"
                  : step === 3
                    ? "Choose a new password"
                    : ""}
            </h2>
            <p className="text-[13px] text-stone-400 leading-relaxed mb-7">
              {step === 1
                ? "Enter the email address on your xpensr account. We'll send you a 6-digit code"
                : step === 2
                  ? "We sent a 6-digit code to"
                  : step === 3
                    ? "Make it strong — at least 8 characters with a number and a special character."
                    : ""}
            </p>

            {step === 2 && (
              <div
                className="inline-flex gap-1 px-2 py-1 bg-[var(--color-ind-bg)] rounded-sm 
            items-center font-medium text-[12px] text-[var(--color-ind-text)] 
            border-[0.5px] border-[var(--color-ind-border)] mb-4"
              >
                <Mail size={12} />
                <span>{email}</span>
              </div>
            )}

            {step === 1 ? (
              <>
                <form
                  onSubmit={handleEmailSubmit(handleEmail)}
                  noValidate
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-medium text-stone-500 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@gmail.com"
                      autoComplete="email"
                      className={`w-full h-[42px] border rounded-[10px] px-3 text-[13px] text-stone-900 bg-white outline-none transition-all placeholder:text-stone-300
                  ${
                    emailErrors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                      {...registerEmail("email")}
                    />
                    {emailErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {emailErrors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[42px] bg-indigo-600 hover:bg-indigo-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center mt-2"
                  >
                    {loading ? <Spinner /> : "Send 6-digit code →"}
                  </button>
                </form>
                <p className="text-[13px] text-stone-400 text-center mt-6">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Sign in →
                  </Link>
                </p>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <form
                  onSubmit={handleOtpSubmit(handleOTP)}
                  noValidate
                  className="space-y-4"
                >
                  <label
                    htmlFor="otp"
                    className="block text-[11px] font-medium text-stone-500 mb-1"
                  >
                    Enter the 6-digit code{" "}
                    <span className="text-[var(--color-ink-3)] font-normal">
                      · expires in 0:00
                    </span>
                  </label>
                  <Controller
                    name="otp"
                    control={controlOtp}
                    render={({ field }) => (
                      <InputOTP
                        id="otp"
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />

                  {otpErrors.otp && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {otpErrors.otp.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 h-[42px] bg-indigo-600 hover:bg-indigo-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center mt-2"
                  >
                    {loading ? <Spinner /> : "Verify code →"}
                  </button>
                </form>
                <p className="text-[13px] text-stone-400 text-center mt-6">
                  Didn't get it?{" "}
                  <button className="text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">
                    Resend code
                  </button>
                </p>
                <button
                  className="mt-2 text-[13px] w-full m-auto text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  ← Use a different email
                </button>
              </>
            ) : null}

            {step === 3 ? (
              <form
                onSubmit={handlePasswordSubmit(handlePassword)}
                noValidate
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-medium text-stone-500 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className={`${inputCls(!!passwordErrors.password)} pr-10`}
                      {...registerPassword("password", {
                        onChange: (e) =>
                          setPwStrength(calcStrength(e.target.value)),
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {pwValue?.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 h-[3px] rounded-full transition-all duration-200 ${
                              i <= pwStrength
                                ? PW_BAR_COLOR[pwStrength]
                                : "bg-stone-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-[11px] transition-colors ${PW_TEXT_COLOR[pwStrength]}`}
                      >
                        {PW_HINT[pwStrength]}
                      </p>
                    </div>
                  )}
                  {passwordErrors.password && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {passwordErrors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-[11px] font-medium text-stone-500 mb-1"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPw ? "text" : "password"}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      className={`${inputCls(!!passwordErrors.confirmPassword)} pr-10`}
                      {...registerPassword("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw((v) => !v)}
                      aria-label={
                        showConfirmPw ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showConfirmPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[42px] bg-indigo-600 hover:bg-indigo-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center mt-2"
                >
                  {loading ? <Spinner /> : "Set new password →"}
                </button>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
};

export default ForgotPasswordPage;

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 8S3.5 3.5 8 3.5 15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l12 12M6.8 4.7A5.5 5.5 0 018 4.5c4 0 6.5 3.5 6.5 3.5a12 12 0 01-2 2.5M9.8 11A5 5 0 018 11.5c-4.5 0-7-3.5-7-3.5A11 11 0 013.2 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

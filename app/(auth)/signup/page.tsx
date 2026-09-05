"use client";

import AuthLeft from "@/app/_components/AuthLeft/AuthLeft";
import { Spinner } from "@/app/_components/Spinner/Spinner";
import { signupUser } from "@/app/_feature/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { PW_BAR_COLOR, PW_HINT, PW_TEXT_COLOR } from "@/app/_utils/constants";
import { calcStrength, inputCls } from "@/app/_utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.email("Enter a valid email address.").min(1, "Email is required."),
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

type FormInput = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.auth);

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [termsErr, setTermsErr] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({ resolver: zodResolver(schema) });

  const pwValue = watch("password", "");

  const handleSignup = async (data: FormInput) => {
    if (!agreed) {
      setTermsErr("You must agree to the terms to continue.");
      return;
    }
    setTermsErr("");
    const result = await dispatch(signupUser({ ...data, emailId: data.email }));
    if (signupUser.fulfilled.match(result)) {
      router.replace("/dashboard");
    }
  };

  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* ── left panel ── */}
      <AuthLeft variant="signup" />

      {/* ── right form ── */}
      <div className="flex items-center justify-center bg-white px-12 py-10 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Header */}
          <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-[0.1em] mb-2">
            Get started
          </p>
          <h2 className="font-[var(--font-display)] text-[28px] font-medium tracking-tight text-stone-900 mb-1">
            Create account
          </h2>
          <p className="text-[13px] text-stone-400 leading-relaxed mb-7">
            Free forever. No credit card required.
          </p>

          {/* Google */}
          {/* <button
            type="button"
            className="w-full h-[42px] flex items-center justify-center gap-2.5 border border-stone-200 rounded-[10px] text-[13px] text-stone-500 bg-white hover:bg-stone-50 transition-colors"
          >
            <GoogleIcon />
            Sign up with Google
          </button> */}

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 whitespace-nowrap">
              or sign up with email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div> */}

          <form
            onSubmit={handleSubmit(handleSignup)}
            noValidate
            className="space-y-4"
          >
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[11px] font-medium text-stone-500 mb-1"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  autoComplete="given-name"
                  className={inputCls(!!errors.firstName)}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-[11px] font-medium text-stone-500 mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  autoComplete="family-name"
                  className={inputCls(!!errors.lastName)}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
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
                className={inputCls(!!errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
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
                  className={`${inputCls(!!errors.password)} pr-10`}
                  {...register("password", {
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
              {errors.password && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.password.message}
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
                  className={`${inputCls(!!errors.confirmPassword)} pr-10`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  aria-label={showConfirmPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showConfirmPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            {/* <div>
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agreed}
                  onClick={() => {
                    setAgreed((v) => !v);
                    setTermsErr("");
                  }}
                  className={`w-[18px] h-[18px] rounded-[4px] border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                    agreed
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-stone-300"
                  }`}
                >
                  {agreed && <CheckIcon />}
                </button>
                <p className="text-[12px] text-stone-500 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Privacy policy
                  </Link>
                </p>
              </div>
              {termsErr && (
                <p className="text-[11px] text-red-500 mt-1 ml-[26px]">
                  {termsErr}
                </p>
              )}
            </div> */}

            {/* API error */}
            {error?.message && (
              <p className="text-[11px] text-red-500">{error.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[42px] bg-indigo-600 hover:bg-indigo-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center"
            >
              {loading ? <Spinner /> : "Create account →"}
            </button>
          </form>

          {/* Switch */}
          <p className="text-[13px] text-stone-400 text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── icons ────────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M15.2 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.04a3.45 3.45 0 01-1.5 2.27v1.88h2.42c1.42-1.3 2.24-3.22 2.24-5.6z"
        fill="#4285F4"
      />
      <path
        d="M8 15.5c2.02 0 3.72-.67 4.96-1.81l-2.42-1.88c-.67.45-1.53.71-2.54.71-1.96 0-3.61-1.32-4.2-3.1H1.3v1.94A7.5 7.5 0 008 15.5z"
        fill="#34A853"
      />
      <path
        d="M3.8 9.42A4.5 4.5 0 013.56 8c0-.5.08-.98.24-1.42V4.64H1.3A7.5 7.5 0 00.5 8c0 1.21.29 2.36.8 3.36l2.5-1.94z"
        fill="#FBBC05"
      />
      <path
        d="M8 3.5c1.1 0 2.1.38 2.87 1.12l2.15-2.15C11.72.84 10.02.5 8 .5A7.5 7.5 0 001.3 4.64l2.5 1.94C4.39 4.82 6.04 3.5 8 3.5z"
        fill="#EA4335"
      />
    </svg>
  );
}

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

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 5.5l2.5 2.5 4.5-4.5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

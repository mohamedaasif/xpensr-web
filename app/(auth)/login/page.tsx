"use client";

import AuthLeft from "@/app/_components/AuthLeft/AuthLeft";
import { loginUser } from "@/app/_feature/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.email("Enter a valid email address.").min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

type FormInput = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.auth);
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ resolver: zodResolver(schema) });

  const handleLogin = async (data: FormInput) => {
    const result = await dispatch(
      loginUser({ emailId: data.email, password: data.password }),
    );
    if (loginUser.fulfilled.match(result)) {
      router.replace("/dashboard");
    }
  };

  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* ── left panel ── */}
      <AuthLeft variant="signin" />

      {/* ── right form ── */}
      <div className="flex items-center justify-center bg-white px-12 py-10">
        <div className="w-full max-w-sm">
          {/* Header */}
          <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-[0.1em] mb-2">
            Welcome back
          </p>
          <h2 className="font-['DM_Sans'] text-[28px] font-medium tracking-tight text-stone-900 mb-1">
            Sign in
          </h2>
          <p className="text-[13px] text-stone-400 leading-relaxed mb-7">
            Enter your email and password to access your account.
          </p>

          {/* Google */}
          {/* <button
            type="button"
            className="w-full h-[42px] flex items-center justify-center gap-2.5 border border-stone-200 rounded-[10px] text-[13px] text-stone-500 bg-white hover:bg-stone-50 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button> */}

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 whitespace-nowrap">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div> */}

          <form
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            className="space-y-4"
          >
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
                className={`w-full h-[42px] border rounded-[10px] px-3 text-[13px] text-stone-900 bg-white outline-none transition-all placeholder:text-stone-300
                  ${
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
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
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="text-[11px] font-medium text-stone-500"
                >
                  Password
                </label>
                {/* <button
                  type="button"
                  className="text-[11px] text-indigo-500 hover:text-indigo-700"
                  onClick={() => {
                  }}
                >
                  Forgot password?
                </button> */}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full h-[42px] border rounded-[10px] px-3 pr-10 text-[13px] text-stone-900 bg-white outline-none transition-all placeholder:text-stone-300
                    ${
                      errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  {...register("password")}
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
              {errors.password && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* API error */}
            {error?.message && (
              <p className="text-[11px] text-red-500">{error.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[42px] bg-indigo-600 hover:bg-indigo-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-[10px] transition-colors flex items-center justify-center mt-2"
            >
              {loading ? <Spinner /> : "Sign in →"}
            </button>
          </form>

          {/* Switch */}
          <p className="text-[13px] text-stone-400 text-center mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── icons ────────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
  );
}

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

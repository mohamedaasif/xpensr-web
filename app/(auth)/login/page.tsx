"use client";

import AuthBanner from "@/app/_components/AuthBanner";
import { loginUser } from "@/app/_feature/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

interface FormInput {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (store) => store.auth,
  );

  const schema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (data: FormInput) => {
    const { email, password } = data;
    if (!email || !password) return;
    const result = await dispatch(
      loginUser({ emailId: email, password: password }),
    )
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.payload.data));
        router.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex">
      <AuthBanner
        bannerTitle="Take Control of Your Finances"
        bannerDesc="Track expenses, manage budgets, and achieve your savings goals with
            ease."
      />

      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mb-6">Login to your account</p>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter Email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm pt-1 pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label className="text-gray-600">Password</label>
                <span className="text-indigo-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter Password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm pt-1 pl-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            {error?.message && (
              <p className="text-red-600 text-sm pl-1">{error?.message}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Log In"}
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
              New to Xpensr?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

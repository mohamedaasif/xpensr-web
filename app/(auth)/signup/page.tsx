"use client";

import Link from "next/link";
import AuthBanner from "@/app/_components/AuthBanner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { signupUser } from "@/app/_feature/auth/authThunk";
import { useRouter } from "next/navigation";

export default function Signup() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.auth);

  const schema = z
    .object({
      firstName: z.string().nonempty("First name is required"),
      lastName: z.string().nonempty("Last name is required"),
      email: z.email().nonempty("Email is required"),
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Atleast 1 uppercase character")
        .regex(/[a-z]/, "Atleast 1 lowercase character")
        .regex(/[0-9]/, "Atleast 1 number")
        .regex(/[^A-Za-z0-9]/, "Atleast 1 symbol"),
      confirmPassword: z.string().nonempty("Re-enter your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSignup = async (formData: any) => {
    const result = await dispatch(
      signupUser({ ...formData, emailId: formData.email }),
    )
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.payload.data));
        router.replace("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <AuthBanner
        bannerTitle="Start Your Financial Journey Today"
        bannerDesc="Join Xpensr to track expenses, manage budgets, and grow your
              savings effortlessly."
      />

      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Create your account
          </h2>
          <p className="text-gray-500 mb-6">Get started in just a few steps</p>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="Enter First Name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm pt-1 pl-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Enter Last Name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm pt-1 pl-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
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
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Re-enter password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm pt-1 pl-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <p className="text-gray-600">
                I agree to the{" "}
                <span className="text-indigo-600 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-indigo-600 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                type="submit"
                href="/login"
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

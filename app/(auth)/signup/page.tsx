"use client";

import Image from "next/image";
import finance_bg from "../../../public/finance_bg.png";
import logo from "../../../public/logo.png";
import Link from "next/link";
import AuthBanner from "@/app/_components/AuthBanner";

export default function Signup() {
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

          <form className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
            <button className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Create Account
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
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

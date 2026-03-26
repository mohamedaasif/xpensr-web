"use client";

import AuthBanner from "@/app/_components/AuthBanner";
import Link from "next/link";

export default function Login() {
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

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <label className="text-gray-600">Password</label>
                <span className="text-indigo-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Log In
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

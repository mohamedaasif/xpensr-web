"use client";

import { useState } from "react";
import Link from "next/link";

export default function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative rounded-2xl px-6 py-5 overflow-hidden"
      style={{ background: "#1E1B4B" }}
    >
      {/* decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-60px",
          right: "-40px",
          width: "240px",
          height: "240px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)",
        }}
      />

      {/* dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss welcome banner"
        className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center transition-colors z-10"
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          background: "transparent",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <XIcon />
      </button>

      {/* content */}
      <div className="relative z-10 flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2
            className="font-[var(--font-display)] text-[18px] font-medium mb-1.5"
            style={{ color: "#ffffff", letterSpacing: "-0.3px" }}
          >
            Welcome to xpensr 👋
          </h2>
          <p
            className="text-[13px] leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Add your first account to start tracking your money — it takes less
            than a minute.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/accounts"
            className="flex items-center gap-1.5 h-8 px-4 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "#ffffff", color: "#4F46E5" }}
          >
            <PlusIcon />
            Add account
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 2l7 7M9 2L2 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

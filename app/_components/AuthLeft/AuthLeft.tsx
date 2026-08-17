"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

type AuthVariant = "signin" | "signup";

interface AuthLeftProps {
  variant: AuthVariant;
}

const CONTENT = {
  signin: {
    eyebrow: "Welcome back",
    headline: ["Every rupee,", "accounted for."],
    sub: "Sign in to pick up where you left off. Your accounts and transactions are right where you left them.",
    features: null,
    stats: [
      { val: "₹0", label: "to get started" },
      { val: "2 min", label: "to set up" },
      { val: "100%", label: "free forever" },
    ],
  },
  signup: {
    eyebrow: "Built for India",
    headline: ["Know where your", "money goes."],
    sub: "Track expenses across UPI, cash, cards and bank transfers — in ₹ Indian format, built for how India actually pays.",
    features: [
      {
        icon: "✦",
        title: "All account types",
        desc: "Savings, credit cards, wallets, cash and investments",
      },
      {
        icon: "✦",
        title: "UPI-aware",
        desc: "Built around how India transacts — not just another USD app",
      },
      {
        icon: "✦",
        title: "Indian number format",
        desc: "₹1,00,000 not ₹100,000 — every rupee in its right place",
      },
    ],
    stats: [
      { val: "Free", label: "no credit card" },
      { val: "INR", label: "native support" },
      { val: "6", label: "account types" },
    ],
  },
};

const MOCK_TRANSACTIONS = [
  {
    emoji: "🛵",
    desc: "Swiggy · UPI",
    amt: "−₹450",
    positive: false,
    color: "#EFF6FF",
  },
  {
    emoji: "🏠",
    desc: "Rent · BankTransfer",
    amt: "−₹18,000",
    positive: false,
    color: "#FFFBEB",
  },
  {
    emoji: "💼",
    desc: "Salary · Income",
    amt: "+₹72,000",
    positive: true,
    color: "#ECFDF5",
  },
];

export default function AuthLeft({ variant }: AuthLeftProps) {
  const content = CONTENT[variant];

  return (
    <div
      className="relative flex flex-col justify-between min-h-screen px-12 py-10 overflow-hidden"
      style={{ background: "#1E1B4B" }}
    >
      {/* ── decorative grid ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── glow blobs ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-100px",
          left: "-80px",
          width: "360px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: "-80px",
          right: "-60px",
          width: "280px",
          height: "280px",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.16) 0%, transparent 65%)",
        }}
      />

      {/* ── logo ── */}
      <div className="relative z-10">
        <Image
          src={logo}
          alt="xpensr"
          height={32}
          priority
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* ── hero text ── */}
      <div className="relative z-10">
        <p
          className="text-[11px] font-medium uppercase mb-3.5"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.13em" }}
        >
          {content.eyebrow}
        </p>

        <h1
          className="font-['DM_Sans'] text-[36px] font-medium leading-[1.15] mb-4"
          style={{ letterSpacing: "-0.9px", color: "#ffffff" }}
        >
          {content.headline[0]}
          <br />
          <span style={{ color: "rgba(255,255,255,0.32)" }}>
            {content.headline[1]}
          </span>
        </h1>

        <p
          className="text-[14px] leading-[1.68] max-w-[340px]"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          {content.sub}
        </p>

        {/* feature list — signup only */}
        {content.features && (
          <ul className="mt-6 flex flex-col gap-3.5 list-none">
            {content.features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span
                  className="text-[10px] mt-[3px] flex-shrink-0"
                  style={{ color: "#818CF8" }}
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                <div>
                  <span
                    className="block text-[13px] font-medium mb-0.5"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {f.title}
                  </span>
                  <span
                    className="block text-[11px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {f.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── floating account card — signin only ── */}
      {variant === "signin" && (
        <div
          aria-hidden="true"
          className="absolute z-10 w-[230px] rounded-2xl p-3.5"
          style={{
            bottom: "120px",
            right: "-24px",
            background: "rgba(255,255,255,0.06)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* green stripe */}
          <div
            className="h-[3px] rounded-full mb-3"
            style={{ background: "linear-gradient(90deg, #059669, #34D399)" }}
          />

          {/* card top */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <p
                className="text-[10px] mb-0.5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Card · Axis Bank
              </p>
              <p
                className="font-['JetBrains_Mono'] text-[18px] font-medium text-white"
                style={{ letterSpacing: "-0.4px" }}
              >
                ₹76,530
              </p>
            </div>
            <span
              className="text-[9px] font-medium rounded-full px-1.5 py-0.5"
              style={{
                color: "#818CF8",
                background: "rgba(79,70,229,0.2)",
                border: "0.5px solid rgba(79,70,229,0.3)",
              }}
            >
              Default
            </span>
          </div>

          {/* transactions */}
          <div
            className="flex flex-col pt-1.5"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
          >
            {MOCK_TRANSACTIONS.map((t, idx) => (
              <div
                key={t.desc}
                className="flex items-center gap-2 py-1.5"
                style={{
                  borderBottom:
                    idx < MOCK_TRANSACTIONS.length - 1
                      ? "0.5px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                <div
                  className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center text-[11px] flex-shrink-0 opacity-85"
                  style={{ background: t.color }}
                >
                  {t.emoji}
                </div>
                <span
                  className="flex-1 text-[10px] truncate"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.desc}
                </span>
                <span
                  className="font-['JetBrains_Mono'] text-[10px] font-medium flex-shrink-0"
                  style={{ color: t.positive ? "#34D399" : "#F87171" }}
                >
                  {t.amt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── stats strip ── */}
      <div className="relative z-10 flex gap-7">
        {content.stats.map((s) => (
          <div key={s.label}>
            <p
              className="font-['JetBrains_Mono'] text-[19px] font-medium text-white"
              style={{ letterSpacing: "-0.4px" }}
            >
              {s.val}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

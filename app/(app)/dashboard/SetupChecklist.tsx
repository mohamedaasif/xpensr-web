"use client";

import Link from "next/link";

interface SetupChecklistProps {
  hasAccounts: boolean;
  hasTransactions: boolean;
}

export default function SetupChecklist({
  hasAccounts,
  hasTransactions,
}: SetupChecklistProps) {
  const steps = [
    {
      id: 1,
      label: "Add your first account",
      sub: "Bank account, credit card, wallet or cash",
      done: hasAccounts,
      href: "/accounts",
      active: !hasAccounts,
    },
    {
      id: 2,
      label: "Record your first transaction",
      sub: "An expense or income",
      done: hasTransactions,
      href: "/transactions",
      active: hasAccounts && !hasTransactions,
    },
    {
      id: 3,
      label: "You're all set",
      sub: "Check your dashboard stats",
      done: hasAccounts && hasTransactions,
      href: "/dashboard",
      active: hasAccounts && hasTransactions,
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const progressPct = Math.round((doneCount / steps.length) * 100);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div>
          <p className="text-[13px] font-medium text-stone-800">Get started</p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {doneCount} of {steps.length} steps done
          </p>
        </div>
        <span className="font-['JetBrains_Mono'] text-[11px] text-stone-400">
          {progressPct}%
        </span>
      </div>

      <div className="h-[3px] bg-stone-100">
        <div
          className="h-[3px] bg-indigo-600 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {steps.map((step, idx) => (
        <Link
          key={step.id}
          href={step.done || step.active ? step.href : "#"}
          className={`flex items-center gap-3 px-4 py-3.5 transition-colors
            ${idx < steps.length - 1 ? "border-b border-stone-100" : ""}
            ${step.active && !step.done ? "hover:bg-stone-50 cursor-pointer" : ""}
            ${step.done ? "opacity-60" : ""}
            ${!step.done && !step.active ? "cursor-default" : ""}
          `}
        >
          <div
            className={`w-[20px] h-[20px] rounded-full flex-shrink-0 flex items-center justify-center transition-all
              ${
                step.done
                  ? "bg-emerald-500 border-emerald-500"
                  : step.active
                    ? "border-2 border-indigo-500"
                    : "border-2 border-stone-200"
              }`}
          >
            {step.done && <CheckIcon />}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className={`text-[13px] font-medium ${
                step.done ? "text-stone-400 line-through" : "text-stone-800"
              }`}
            >
              {step.label}
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">{step.sub}</p>
          </div>

          {step.active && !step.done && (
            <div className="flex-shrink-0 text-stone-300">
              <ArrowIcon />
            </div>
          )}

          {step.done && (
            <div className="flex-shrink-0">
              <span className="text-[11px] font-medium text-emerald-500">
                Done
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7h8M8 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

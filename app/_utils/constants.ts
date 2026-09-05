import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  BarChart3,
  Tags,
  CreditCard,
  Settings,
} from "lucide-react";

export const NavLinks = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Transactions",
        href: "/transactions",
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        name: "Accounts",
        href: "/accounts",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export type ApiError = {
  message?: string;
  status?: number;
};

export const ACCOUNT_TYPES = [
  "Cash",
  "Savings",
  "Current",
  "Credit_Card",
  "Wallet",
  "Investment",
];

export const CURRENCY = ["INR", "USD"];

export const TRANSACTION_TYPES = ["Expense", "Income", "Transfer"];

export const PAYMENT_METHOD = ["UPI", "Cash", "Card", "BankTransfer", "Cheque"];

export const PW_HINT = [
  "At least 8 characters with uppercase, number and symbol.",
  "Weak — add uppercase and numbers.",
  "Fair — add a special character (!@#$%).",
  "Good — almost there!",
  "Strong password ✓",
];

export const PW_BAR_COLOR = [
  "bg-stone-200",
  "bg-red-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];

export const PW_TEXT_COLOR = [
  "text-stone-400",
  "text-red-500",
  "text-amber-600",
  "text-blue-500",
  "text-emerald-600",
];

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

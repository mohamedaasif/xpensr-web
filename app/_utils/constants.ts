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
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Budgets", href: "/budgets", icon: Wallet },
  { name: "Goals", href: "/goals", icon: Target },

  { name: "Reports", href: "/reports", icon: BarChart3 },

  { name: "Categories", href: "/categories", icon: Tags },
  { name: "Accounts", href: "/accounts", icon: CreditCard },

  { name: "Settings", href: "/settings", icon: Settings },
];

export type ApiError = {
  message?: string;
  status?: number;
};

export type AccountType =
  | "Cash"
  | "Savings"
  | "Current"
  | "Credit_Card"
  | "Wallet"
  | "Investment";

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  bankName: string | null;
  openingBalance: number;
  balance: number;
  currency: string;
  isDefault: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateAccountDto = Omit<
  Account,
  "id" | "userId" | "balance" | "createdAt" | "updatedAt"
>;

export type UpdateAccountDto = Partial<
  Omit<Account, "id" | "userId" | "balance" | "createdAt" | "updatedAt">
>;

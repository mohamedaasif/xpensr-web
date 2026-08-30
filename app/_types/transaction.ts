export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  toAccountId: string;
  type: string;
  amount: number;
  description: string;
  notes: string;
  transactionDate: string;
  paymentMethod: string;
  referenceNo: string;
  location: string;
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTransactionDto = Omit<Transaction, "id" | "userId">;

export type UpdateTransactionDto = Partial<Omit<Transaction, "id" | "userId">>;

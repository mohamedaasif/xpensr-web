export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  type: string;
  amount: number;
  description: string;
  notes: string;
  transactionDate: string;
  paymentMethod: string;
  referenceNo: string;
  location: string;
  isRecurring: boolean;
}

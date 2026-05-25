export interface Income {
  id?: number;
  userEmail: string;
  amount: number;
  source: string;
  category: string;
  dateOfIncome: string;
}

export interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
}

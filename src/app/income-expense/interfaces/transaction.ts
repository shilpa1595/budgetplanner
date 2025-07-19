export interface Transaction {
    type: 'income' | 'expense';
    amount: number;
    category: string;
    date: string;
}

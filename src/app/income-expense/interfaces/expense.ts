export interface Expense {
    id?: number; 
    category: string;
    amount:number;
    dateOfExpense: string; 
    paymentMode: string;
    description?: string; 
    userEmail: string; 
}

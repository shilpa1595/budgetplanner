export interface BudgetSettings {
    monthlyLimit: number;
}

export interface Profile {
    userId: string; // User ID
    uname: string;
    email: string;
    profilePicture?: string;
    incomeSource: string[];
    incomeCategories: string[];
    expenseCategories: string[];
    budgetSettings: BudgetSettings; // Reference to BudgetSettings
}
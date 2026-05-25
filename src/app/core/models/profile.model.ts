export interface BudgetSettings {
  monthlyLimit: number;
}

export interface Profile {
  id?: string;
  userId: string;
  uname: string;
  email: string;
  profilePicture?: string;
  incomeSource: string[];
  incomeCategories: string[];
  expenseCategories: string[];
  budgetSettings: BudgetSettings;
}

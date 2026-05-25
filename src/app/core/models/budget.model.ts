export interface Budget {
  id?: string;
  userId: string;
  categories: Category[];
}

export interface Category {
  name: string;
  budget: BudgetDetails;
}

export interface BudgetDetails {
  limit: number;
  spent: number;
}

export interface Categories {
  id?: string;
  userId: string;
  email: string;
  income: string[];
  expense: string[];
}

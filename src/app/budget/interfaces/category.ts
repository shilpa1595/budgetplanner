export interface Categories {
    userId: string; 
    email: string;
    categoriesData: {
        income: string[];
        expense: string[];
    };
}

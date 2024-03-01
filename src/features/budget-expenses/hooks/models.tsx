export type Budget = {
    category: IExpenseCategory;
    expenses: IExpense[];
};
export type IExpenseCategory = {
    id: number;
    name: string;
};
export type IExpense = {
    id: number;
    name: string;
    category_id: number;
    expected_low?: number;
    expected?: number;
    expected_high?: number;
    actual?: number;
    paid?: number;
};

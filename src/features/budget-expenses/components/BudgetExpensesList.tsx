'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { useExpenseCategories } from '../hooks/useExpenseCategoriesStore';
import { useMemo } from 'react';
import { BudgetExpenseCategoryRows } from './BudgetExpenseCategoryRows';
import { BudgetExpenseHeader } from './BudgetExpenseHeader';
import { BudgetExpenseSummaryRow } from './BudgetExpenseSummaryRow';

export const colVis = {
    name: '',
    estimated_low: 'hidden md:table-cell',
    estimated_high: 'hidden md:table-cell',
    estimated: '',
    actual: '',
    paid: '',
    balance: 'hidden sm:table-cell',
};

export function BudgetExpensesList() {
    const { expenses } = useExpenses();
    const { expenseCategories } = useExpenseCategories();

    const budgets = useMemo(() => {
        console.log('budgets', expenses, expenseCategories);
        return expenseCategories.map((category) => {
            return {
                category: category,
                expenses: expenses.filter(
                    (expense) => expense.category_id === category.id
                ),
            };
        });
    }, [expenses, expenseCategories]);

    return (
        <Iq7Table className=''>
            <BudgetExpenseHeader />
            <Iq7Table.Body>
                {budgets.map((budget) => (
                    <BudgetExpenseCategoryRows budget={budget} />
                ))}
                <BudgetExpenseSummaryRow />
            </Iq7Table.Body>
        </Iq7Table>
    );
}

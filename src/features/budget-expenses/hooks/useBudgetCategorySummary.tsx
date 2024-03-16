'use client';
import { Budget, IExpense } from './models';

export function useBudgetExpensesSummary(expenses: IExpense[]) {
    return {
        totalLow: expenses.reduce(
            (prev, curr) => prev + (curr.expected_low || 0),
            0
        ),
        totalHigh: expenses.reduce(
            (prev, curr) => prev + (curr.expected_high || 0),
            0
        ),
        totalExpected: expenses.reduce(
            (prev, curr) => prev + (curr.expected || 0),
            0
        ),
        totalActual: expenses.reduce(
            (prev, curr) => prev + (curr.actual || 0),
            0
        ),
        totalPaid: expenses.reduce((prev, curr) => prev + (curr.paid || 0), 0),
        totalBalance: expenses.reduce(
            (prev, curr) =>
                prev +
                Math.max(
                    (curr.actual || curr.expected || 0) - (curr.paid || 0),
                    0
                ),
            0
        ),
    };
}

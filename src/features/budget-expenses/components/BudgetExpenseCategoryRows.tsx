'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { useExpenseCategories } from '../hooks/useExpenseCategoriesStore';
import { useState } from 'react';
import { BudgetExpenseRow } from './BudgetExpenseRow';
import { Budget } from '../hooks/models';
import { useLocalItem } from '@/src/utils/useLocalItem';
import { AddExpenseRow } from './AddExpenseRow';
import { colVis } from './BudgetExpensesList';
import { Iq7NumberInput } from '@/src/components/NonFormInputs/Iq7NumberInput';
import { Iq7TextInput } from '@/src/components/NonFormInputs/Iq7TextInput';
import { currencyFormatter } from '@/src/utils/currencyFormatter';
import { useBudgetExpensesSummary } from '../hooks/useBudgetCategorySummary';

export function BudgetExpenseCategoryRows({ budget }: { budget: Budget }) {
    return (
        <>
            <Iq7Table.ExpandingRow
                key={budget.category.id}
                className='group'
                expandedContent={
                    <>
                        {budget.expenses.map((expense) => (
                            <BudgetExpenseRow
                                expense={expense}
                                key={expense.id}
                            />
                        ))}
                        <AddExpenseRow category={budget.category} />
                    </>
                }
            >
                <BudgetExpenseCategoryRowColumns budget={budget} />
            </Iq7Table.ExpandingRow>
        </>
    );
}
function BudgetExpenseCategoryRowColumns({ budget }: { budget: Budget }) {
    const { saveExpenseCategory } = useExpenseCategories();
    const {
        totalLow,
        totalHigh,
        totalExpected,
        totalActual,
        totalPaid,
        totalBalance,
    } = useBudgetExpensesSummary(budget.expenses);

    const sumColumnClassName =
        'text-center group-data-[expanded=true]:opacity-50 ';
    return (
        <>
            <td className='pl-1 sm:pl-2 font-semibold text-sm py-2 whitespace-nowrap'>
                <div className='flex'>
                    <Iq7Table.ExpandingRowTrigger />
                    <Iq7TextInput
                        sneaky={true}
                        className='w-full'
                        value={budget.category.name}
                        onValueChange={(value) =>
                            saveExpenseCategory({
                                ...budget.category,
                                name: value,
                            })
                        }
                    />
                </div>
            </td>
            <td className={`${colVis.estimated_low} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalLow)}
            </td>
            <td className={`${colVis.estimated_high} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalHigh)}
            </td>
            <td className={`${colVis.estimated} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalExpected)}
            </td>
            <td className={`${colVis.actual} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalActual)}
            </td>
            <td className={`${colVis.paid} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalPaid)}
            </td>
            <td className={`${colVis.balance} ${sumColumnClassName}`}>
                {currencyFormatter.format(totalBalance)}
            </td>
            <td></td>
        </>
    );
}

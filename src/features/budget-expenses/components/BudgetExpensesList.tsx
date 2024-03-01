'use client';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { useExpenseCategories } from '../hooks/useExpenseCategoriesStore';
import { useEffect, useMemo, useState } from 'react';
import { BudgetExpenseRow } from './BudgetExpenseRow';
import { Budget, IExpenseCategory } from '../hooks/models';
import { ICategory } from '../../models';
import { useLocalItem } from '@/src/utils/useLocalItem';

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

    const sumColumnClassName = 'text-center -translate-x-2';

    return (
        <Iq7Table className=''>
            <thead>
                <tr className='border-none hidden md:table-row'>
                    <th></th>
                    <th
                        colSpan={3}
                        className={`text-center p-0 m-0 border-l border-r`}
                    >
                        Estimated
                    </th>
                    <th
                        colSpan={2}
                        className='text-center p-0 m-0 border-l border-r'
                    >
                        Actual
                    </th>
                    <th className=''></th>
                </tr>
                <tr>
                    <th className={`${colVis.name} pl-1 sm:pl-2 text-left`}>
                        Expense
                    </th>
                    <th
                        className={`${colVis.estimated_low} text-center sm:border-l`}
                    >
                        Low
                    </th>
                    <th className={`${colVis.estimated_high} text-center`}>
                        High
                    </th>
                    <th
                        className={`${colVis.estimated} text-center sm:border-r`}
                    >
                        Expected
                    </th>
                    <th className={`${colVis.actual} text-center`}>Cost</th>
                    {/* <th className='hidden lg:table-cell text-center'>
                        Difference
                    </th> */}
                    <th className={`${colVis.paid} text-center sm:border-r`}>
                        Paid
                    </th>
                    <th className={`${colVis.balance} text-center`}>Balance</th>
                </tr>
            </thead>
            <Iq7Table.Body>
                {budgets.map((budget) => (
                    <BudgetExpenseCategoryRows budget={budget} />
                ))}
                <Iq7Table.Row className='bg-accent my-0'>
                    <td
                        // colSpan={expandCategory ? 10 : 1}
                        className='pl-1 sm:pl-2 font-semibold text-sm py-2 whitespace-nowrap'
                    >
                        TOTAL
                    </td>
                    <td
                        className={`${colVis.estimated_low} ${sumColumnClassName}`}
                    >
                        {expenses.reduce(
                            (prev, curr) => prev + (curr.expected_low || 0),
                            0
                        )}
                    </td>
                    <td
                        className={`${colVis.estimated_high} ${sumColumnClassName}`}
                    >
                        {expenses.reduce(
                            (prev, curr) => prev + (curr.expected_high || 0),
                            0
                        )}
                    </td>
                    <td className={`${colVis.estimated} ${sumColumnClassName}`}>
                        {expenses.reduce(
                            (prev, curr) => prev + (curr.expected || 0),
                            0
                        )}
                    </td>
                    <td className={`${colVis.actual} ${sumColumnClassName}`}>
                        {expenses.reduce(
                            (prev, curr) => prev + (curr.actual || 0),
                            0
                        )}
                    </td>
                    <td className={`${colVis.paid} ${sumColumnClassName}`}>
                        {expenses.reduce(
                            (prev, curr) => prev + (curr.paid || 0),
                            0
                        )}
                    </td>
                    <td
                        className={`${colVis.balance} ${sumColumnClassName} translate-x-0`}
                    >
                        {expenses.reduce(
                            (prev, curr) =>
                                prev +
                                Math.max(
                                    (curr.actual || 0) - (curr.paid || 0),
                                    0
                                ),
                            0
                        )}
                    </td>
                    <td></td>
                </Iq7Table.Row>
            </Iq7Table.Body>
        </Iq7Table>
    );
}

function BudgetExpenseCategoryRows({ budget }: { budget: Budget }) {
    const { saveExpense } = useExpenses();
    const { saveExpenseCategory } = useExpenseCategories();
    const { localItem: localCategory, handleTextFieldChange } = useLocalItem(
        budget.category
    );
    const [expandCategory, setExpandCategory] = useState(true);

    const sumColumnClassName =
        'text-center -translate-x-2 ' + (expandCategory ? 'opacity-50 ' : '');
    return (
        <>
            <Iq7Table.Row key={localCategory.id} className='bg-base-300 my-0'>
                <td
                    // colSpan={expandCategory ? 10 : 1}
                    className='pl-1 sm:pl-2 font-semibold text-sm py-2 whitespace-nowrap'
                >
                    <Iq7GhostButton
                        className={`p-0 btn-circle !btn-xs ${
                            expandCategory ? 'rotate-90' : ''
                        }`}
                        onClick={(_) => {
                            setExpandCategory(!expandCategory);
                        }}
                    >
                        {'>'}
                    </Iq7GhostButton>
                    <input
                        className='p-1 bg-[unset] hover:bg-white truncate w-full '
                        onChange={handleTextFieldChange('name')}
                        onBlur={(_) => saveExpenseCategory(localCategory)}
                        value={localCategory.name}
                    />
                </td>
                {true && (
                    <>
                        <td
                            className={`${colVis.estimated_low} ${sumColumnClassName}`}
                        >
                            {budget.expenses.reduce(
                                (prev, curr) => prev + (curr.expected_low || 0),
                                0
                            )}
                        </td>
                        <td
                            className={`${colVis.estimated_high} ${sumColumnClassName}`}
                        >
                            {budget.expenses.reduce(
                                (prev, curr) =>
                                    prev + (curr.expected_high || 0),
                                0
                            )}
                        </td>
                        <td
                            className={`${colVis.estimated} ${sumColumnClassName}`}
                        >
                            {budget.expenses.reduce(
                                (prev, curr) => prev + (curr.expected || 0),
                                0
                            )}
                        </td>
                        <td
                            className={`${colVis.actual} ${sumColumnClassName}`}
                        >
                            {budget.expenses.reduce(
                                (prev, curr) => prev + (curr.actual || 0),
                                0
                            )}
                        </td>
                        <td className={`${colVis.paid} ${sumColumnClassName}`}>
                            {budget.expenses.reduce(
                                (prev, curr) => prev + (curr.paid || 0),
                                0
                            )}
                        </td>
                        <td
                            className={`${colVis.balance} ${sumColumnClassName} translate-x-0`}
                        >
                            {budget.expenses.reduce(
                                (prev, curr) =>
                                    prev +
                                    Math.max(
                                        (curr.actual || 0) - (curr.paid || 0),
                                        0
                                    ),
                                0
                            )}
                        </td>
                        <td></td>
                    </>
                )}
            </Iq7Table.Row>
            {expandCategory && (
                <>
                    {budget.expenses.map((expense) => (
                        <BudgetExpenseRow expense={expense} key={expense.id} />
                    ))}
                    <Iq7Table.Row key={'add' + localCategory.id}>
                        <td colSpan={7} className='m-0 p-0 pt-1 pb-2'>
                            <div className='flex justify-start p-0'>
                                <Iq7GhostButton
                                    className='p-0 opacity-50 !btn-xs'
                                    onClick={(_) => {
                                        saveExpense({
                                            name: 'New Expense',
                                            category_id: localCategory.id,
                                        });
                                    }}
                                >
                                    Add Expense
                                </Iq7GhostButton>
                            </div>
                        </td>
                    </Iq7Table.Row>
                </>
            )}
        </>
    );
}

'use client';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { IExpense } from '../hooks/models';
import { useEffect, useState } from 'react';
import { useLocalItem } from '@/src/utils/useLocalItem';
import { colVis } from './BudgetExpensesList';

export function BudgetExpenseRow({ expense }: { expense: IExpense }) {
    const { saveExpense, deleteExpense: removeExpense } = useExpenses();
    const {
        localItem: localExpense,
        handleNumericFieldChange,
        handleTextFieldChange,
    } = useLocalItem(expense);

    function saveLocalExpense() {
        saveExpense(localExpense);
    }

    const inputClassName =
        'p-1 m-0 group-hover:border rounded w-full bg-base-100 group-hover:bg-white';
    const numberTdClassName = 'p-0 w-20 sm:w-24 text-center';
    const numberInputClassName = `${inputClassName} text-center`;

    return (
        <Iq7Table.Row className='hover:bg-base-200 cursor-pointer my-0 py-0 second:pt-2 group'>
            <td
                className='py-0 pl-1 sm:pl-2 w-[30%] max-w-24 sm:max-w-[unset] whitespace-nowrap truncate'
                title={localExpense.name}
            >
                <input
                    type='text'
                    value={localExpense.name}
                    onChange={handleTextFieldChange('name')}
                    onBlur={saveLocalExpense}
                    className={inputClassName}
                />
            </td>
            <td className={`${colVis.estimated_low} ${numberTdClassName}`}>
                <input
                    type='number'
                    value={localExpense.expected_low}
                    placeholder='-'
                    onChange={handleNumericFieldChange('expected_low')}
                    onBlur={saveLocalExpense}
                    className={numberInputClassName}
                />
            </td>
            <td className={`${colVis.estimated_high} ${numberTdClassName}`}>
                <input
                    type='number'
                    value={localExpense.expected_high}
                    placeholder='-'
                    onChange={handleNumericFieldChange('expected_high')}
                    onBlur={saveLocalExpense}
                    className={numberInputClassName}
                />
            </td>
            <td className={`${colVis.estimated} ${numberTdClassName}`}>
                <input
                    type='number'
                    value={localExpense.expected}
                    placeholder='-'
                    onChange={handleNumericFieldChange('expected')}
                    onBlur={saveLocalExpense}
                    className={numberInputClassName}
                />
            </td>
            <td className={`${colVis.actual} ${numberTdClassName}`}>
                <input
                    type='number'
                    value={localExpense.actual}
                    placeholder='-'
                    onChange={handleNumericFieldChange('actual')}
                    onBlur={saveLocalExpense}
                    className={numberInputClassName}
                />
            </td>
            {/* <td className={`hidden lg:table-cell ${numberTdClassName}`}>
                {localExpense.actual &&
                    localExpense.expected &&
                    localExpense.actual - localExpense.expected}
            </td> */}
            <td className={`${colVis.paid} ${numberTdClassName}`}>
                <input
                    type='number'
                    value={localExpense.paid}
                    placeholder='-'
                    onChange={handleNumericFieldChange('paid')}
                    onBlur={saveLocalExpense}
                    className={numberInputClassName}
                />
            </td>
            <td
                className={`${colVis.balance} ${numberTdClassName} font-medium`}
            >
                {(localExpense.actual &&
                    localExpense.actual - (localExpense.paid || 0)) ||
                    '-'}
            </td>
            <td className='m-0 p-0 w-0 text-right'>
                <Iq7GhostButton
                    className='opacity-80'
                    onClick={(_) => removeExpense(expense.id)}
                >
                    x
                </Iq7GhostButton>
            </td>
        </Iq7Table.Row>
    );
}

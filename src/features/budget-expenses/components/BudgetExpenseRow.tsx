'use client';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { IExpense } from '../hooks/models';
import { colVis } from './BudgetExpensesList';
import Iq7TextInput from '@/src/components/NonFormInputs/Iq7TextInput';
import Iq7CurrencyInput from '@/src/components/NonFormInputs/Iq7CurrencyInput';
import { currencyFormatter } from '@/src/utils/currencyFormatter';

export function BudgetExpenseRow({ expense }: { expense: IExpense }) {
    const { saveExpense, deleteExpense: removeExpense } = useExpenses();

    let cost = expense.actual || expense.expected;
    let balance = cost && cost - (expense.paid || 0);

    const numberTdClassName = 'p-1 w-20 sm:w-24 text-center';
    return (
        <Iq7Table.Row className='group'>
            <td
                className='py-0 pl-1 sm:pl-2 w-[30%] max-w-24 sm:max-w-[unset] whitespace-nowrap truncate'
                title={expense.name}
            >
                <Iq7TextInput
                    groupSneaky={true}
                    value={expense.name}
                    onValueChange={(v) => saveExpense({ ...expense, name: v })}
                />
            </td>
            <td className={`${colVis.estimated_low} ${numberTdClassName}`}>
                <CurrencyField expense={expense} fieldName='expected_low' />
            </td>
            <td className={`${colVis.estimated_high} ${numberTdClassName}`}>
                <CurrencyField expense={expense} fieldName='expected_high' />
            </td>
            <td className={`${colVis.estimated} ${numberTdClassName}`}>
                <CurrencyField expense={expense} fieldName='expected' />
            </td>
            <td className={`${colVis.actual} ${numberTdClassName}`}>
                <CurrencyField expense={expense} fieldName='actual' />
            </td>
            <td className={`${colVis.paid} ${numberTdClassName}`}>
                <CurrencyField expense={expense} fieldName='paid' />
            </td>
            <td
                className={`${colVis.balance} ${numberTdClassName} font-medium`}
            >
                {balance ? currencyFormatter.format(balance) : '-'}
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

function CurrencyField({
    expense,
    fieldName,
}: {
    expense: IExpense;
    fieldName: keyof IExpense;
}) {
    const { saveExpense } = useExpenses();

    return (
        <Iq7CurrencyInput
            className='text-center'
            groupSneaky={true}
            value={expense[fieldName] as any}
            placeholder='-'
            decimalScale={0}
            onValueChange={(v) => saveExpense({ ...expense, [fieldName]: v })}
        />
    );
}

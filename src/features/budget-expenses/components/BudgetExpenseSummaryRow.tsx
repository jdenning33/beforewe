'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { colVis } from './BudgetExpensesList';
import { useBudgetExpensesSummary } from '../hooks/useBudgetCategorySummary';
import { currencyFormatter } from '@/src/utils/currencyFormatter';

export function BudgetExpenseSummaryRow() {
    const { expenses } = useExpenses();
    const {
        totalLow,
        totalHigh,
        totalExpected,
        totalActual,
        totalPaid,
        totalBalance,
    } = useBudgetExpensesSummary(expenses);

    const sumColumnClassName = 'text-center font-medium';
    return (
        <Iq7Table.SummaryRow>
            <td
                // colSpan={expandCategory ? 10 : 1}
                className='pl-1 sm:pl-2 font-semibold text-sm py-2 whitespace-nowrap'
            >
                TOTAL
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
        </Iq7Table.SummaryRow>
    );
}

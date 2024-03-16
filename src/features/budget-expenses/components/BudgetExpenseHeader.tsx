'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { colVis } from './BudgetExpensesList';

export function BudgetExpenseHeader() {
    return (
        <Iq7Table.Head>
            <Iq7Table.HeadRow className='border-none hidden md:table-row'>
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
            </Iq7Table.HeadRow>
            <Iq7Table.HeadRow>
                <th className={`${colVis.name} pl-1 sm:pl-2 text-left`}>
                    Expense
                </th>
                <th
                    className={`${colVis.estimated_low} text-center sm:border-l`}
                >
                    Low
                </th>
                <th className={`${colVis.estimated_high} text-center`}>High</th>
                <th className={`${colVis.estimated} text-center sm:border-r`}>
                    Expected
                </th>
                <th className={`${colVis.actual} text-center`}>Cost</th>
                <th className={`${colVis.paid} text-center sm:border-r`}>
                    Paid
                </th>
                <th className={`${colVis.balance} text-center`}>Balance</th>
                <th></th>
            </Iq7Table.HeadRow>
        </Iq7Table.Head>
    );
}

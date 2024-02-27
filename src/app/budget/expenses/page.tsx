import { Iq7GhostButton, Iq7OutlineButton } from '@/src/components/Iq7Button';
import { Iq7PageSubTitle, Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { Iq7Table } from '@/src/components/Iq7Table';

export default function BudgetExpensesPage() {
    return (
        <div>
            <Iq7PageTitle>Event Budget - Expenses</Iq7PageTitle>
            <div>
                Track the expected and actual costs for your wedding as well as
                payments you've already made.
            </div>

            <Iq7PageSubTitle>Your Expenses</Iq7PageSubTitle>
            <div className='overflow-auto w-full'>
                <BudgetExpensesList />
            </div>
        </div>
    );
}

const budgets = [
    {
        category: 'Photo and Video',
        expenses: [
            {
                name: 'Photographer',
                expected_low: 800,
                expected: 1000,
                expected_high: 1400,
                actual: 1000,
                payments: [
                    {
                        date: '2021-01-01',
                        is_paid: true,
                        amount: 500,
                    },
                    {
                        date: '2021-02-01',
                        is_paid: false,
                        amount: 500,
                    },
                ],
            },
            {
                name: 'Videographer',
                expected_low: 800,
                expected: 1000,
                expected_high: 1400,
                actual: 1000,
                payments: [
                    {
                        date: '2021-01-01',
                        is_paid: true,
                        amount: 500,
                    },
                    {
                        date: '2021-02-01',
                        is_paid: true,
                        amount: 500,
                    },
                ],
            },
            {
                name: 'Photo Album',
                expected_low: 200,
                expected: 300,
                expected_high: 400,
                actual: 300,
                payments: [
                    {
                        date: '2021-01-01',
                        is_paid: true,
                        amount: 150,
                    },
                    {
                        date: '2021-02-01',
                        is_paid: false,
                        amount: 150,
                    },
                ],
            },
        ],
    },
    {
        category: 'Venue',
        expenses: [
            {
                name: 'Ceremony',
                expected_low: 800,
                expected: 1000,
                expected_high: 1400,
                actual: 1000,
                payments: [
                    {
                        date: '2021-01-01',
                        is_paid: true,
                        amount: 500,
                    },
                    {
                        date: '2021-02-01',
                        is_paid: true,
                        amount: 500,
                    },
                ],
            },
            {
                name: 'Reception',
                expected_low: 800,
                expected: 1000,
                expected_high: 1400,
                actual: 1000,
                payments: [
                    {
                        date: '2021-01-01',
                        is_paid: true,
                        amount: 500,
                    },
                    {
                        date: '2021-02-01',
                        is_paid: true,
                        amount: 500,
                    },
                ],
            },
        ],
    },
];

function BudgetExpensesList() {
    return (
        <Iq7Table className=''>
            <Iq7Table.HeadRow>
                <th className='pl-1 sm:pl-2'>Expense</th>
                <th className='hidden md:table-cell text-right'>Low</th>
                <th className='hidden md:table-cell text-right'>High</th>
                <th className='text-right'>Expected</th>
                <th className='text-right'>Actual</th>
                <th className='hidden lg:table-cell text-right'>Difference</th>
                <th className='text-right'>Paid</th>
                <th className='hidden sm:table-cell text-right'>Balance</th>
            </Iq7Table.HeadRow>
            <Iq7Table.Body>
                {budgets.map((budget) => (
                    <>
                        <Iq7Table.Row
                            key={budget.category}
                            className='bg-base-300 my-0'
                        >
                            <td
                                colSpan={30}
                                className='pl-1 sm:pl-2 font-semibold text-sm py-2 whitespace-nowrap'
                            >
                                {`>`} {budget.category}
                            </td>
                        </Iq7Table.Row>
                        {budget.expenses.map((expense) => (
                            <BudgetExpenseRow
                                expense={expense}
                                key={expense.name}
                            />
                        ))}
                        <Iq7Table.Row key={'add' + budget.category}>
                            <td colSpan={7} className='m-0 p-0 pt-1 pb-2'>
                                <div className='flex justify-start p-0'>
                                    <Iq7GhostButton className='p-0 opacity-50 !btn-xs'>
                                        Add Expense
                                    </Iq7GhostButton>
                                </div>
                            </td>
                        </Iq7Table.Row>
                    </>
                ))}
            </Iq7Table.Body>
        </Iq7Table>
    );
}

function BudgetExpenseRow({ expense }: { expense: any }) {
    return (
        <Iq7Table.Row
            className='hover:bg-base-200 cursor-pointer my-0 py-0 second:pt-2'
            key={expense.name}
        >
            <td
                className='py-0 pl-1 sm:pl-2 w-[20%] max-w-24 sm:max-w-[unset] whitespace-nowrap truncate'
                title={expense.name}
            >
                {expense.name}
            </td>
            <td className='hidden md:table-cell p-0 w-fit text-right'>
                <input
                    type='number'
                    value={expense.expected_low}
                    className='text-right p-1 m-0 border rounded w-20 sm:w-24'
                />
            </td>
            <td className='hidden md:table-cell p-0 w-fit text-right'>
                <input
                    type='number'
                    value={expense.expected_high}
                    className='text-right p-1 m-0 border rounded w-20 sm:w-24'
                />
            </td>
            <td className='p-0 w-fit text-right'>
                <input
                    type='number'
                    value={expense.expected}
                    className='text-right p-1 m-0 border rounded w-20 sm:w-24'
                />
            </td>
            <td className='p-0 w-fit text-right'>
                <input
                    type='number'
                    value={expense.actual}
                    className='text-right p-1 m-0 border rounded w-20 sm:w-24'
                />
            </td>
            <td className='hidden lg:table-cell py-0 text-right'>
                {expense.actual - expense.expected}
            </td>
            <td className='py-0 text-right'>
                {expense.payments.reduce(
                    (acc, p) => (p.is_paid ? acc + p.amount : acc),
                    0
                )}
            </td>
            <td className='hidden sm:table-cell py-0 text-right'>
                {expense.payments.reduce(
                    (acc, p) => (p.is_paid ? acc - p.amount : acc),
                    expense.actual
                )}
            </td>
        </Iq7Table.Row>
    );
}

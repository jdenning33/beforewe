'use client';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { Iq7Table } from '@/src/components/Iq7Table';
import { useExpenses } from '../hooks/useExpenses';
import { IExpenseCategory } from '../hooks/models';

export function AddExpenseRow({
    category: localCategory,
}: {
    category: IExpenseCategory;
}) {
    const { saveExpense } = useExpenses();

    return (
        <Iq7Table.Row key={'add' + localCategory.id}>
            <td colSpan={8} className='m-0 p-0 pt-1 pb-2'>
                <div className='flex justify-start p-0'>
                    <Iq7GhostButton
                        className='mx-1 p-0 opacity-50 !btn-xs'
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
    );
}

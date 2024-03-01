'use client';
import { Iq7PrimaryButton } from '@/src/components/Iq7Button';
import { Iq7PageSubTitle, Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { useExpenseCategories } from '@/src/features/budget-expenses/hooks/useExpenseCategoriesStore';
import { BudgetExpensesList } from '../../../../features/budget-expenses/components/BudgetExpensesList';

export default function BudgetExpensesPage() {
    const { saveExpenseCategory } = useExpenseCategories();

    return (
        <div>
            <Iq7PageTitle>Event Budget - Expenses</Iq7PageTitle>
            <div>
                Track the expected and actual costs for your wedding as well as
                payments you've already made.
            </div>
            <br />
            <Iq7PageSubTitle>Your Expenses</Iq7PageSubTitle>
            <div className='overflow-auto w-full'>
                <BudgetExpensesList />
                <Iq7PrimaryButton
                    className='mt-4'
                    onClick={(_) => {
                        console.log('saveExpenseCategory');
                        saveExpenseCategory({
                            name: 'New Category',
                        });
                    }}
                >
                    New Category
                </Iq7PrimaryButton>
            </div>
        </div>
    );
}

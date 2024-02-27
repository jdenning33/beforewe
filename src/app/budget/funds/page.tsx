'use client';

import { Iq7PrimaryButtonDiv } from '@/src/components/Iq7Button';
import { Iq7PageSubTitle, Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { AvailableFundsByWeekList } from '@/src/features/budget-funds/components/AvailableFundsByWeekList';
import { EditFundingSourceModal } from '@/src/features/budget-funds/components/EditFundingSourceModal';
import { FundingSourcesList } from '@/src/features/budget-funds/components/FundingSourcesList';

export default function BudgetFundsPage() {
    return (
        <div>
            <Iq7PageTitle>Event Budget - Available Funds</Iq7PageTitle>

            <div className='mb-8'>
                Track the money that you have available to spend for your
                wedding.
            </div>

            <div className='flex gap-16 flex-wrap'>
                <div className='flex-auto'>
                    <div className='flex gap-6 justify-between items-center mb-4'>
                        <Iq7PageSubTitle>Your Funding Sources</Iq7PageSubTitle>
                        <EditFundingSourceModal fundingSource={null}>
                            <Iq7PrimaryButtonDiv>
                                Add Funding Source
                            </Iq7PrimaryButtonDiv>
                        </EditFundingSourceModal>
                    </div>
                    <FundingSourcesList />
                </div>

                <div className=''>
                    <div className='flex gap-6 justify-between items-center mb-5'>
                        <Iq7PageSubTitle>
                            Available Funds By Week
                        </Iq7PageSubTitle>
                    </div>
                    <div className='overflow-auto max-h-[70vh]'>
                        <AvailableFundsByWeekList />
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useEffect, useState } from 'react';
import { IFundingSource } from '../hooks/IFundingSource';
import { useFundingSources } from '../hooks/useFundingSources';
import { EditFundingSourceModal } from '@/src/features/budget-funds/components/EditFundingSourceModal';
import { Iq7Table } from '@/src/components/Iq7Table';

export function FundingSourcesList({ className }: { className?: string }) {
    const { fundingSources } = useFundingSources();
    const [selectedFundingSource, setSelectedFundingSource] =
        useState<IFundingSource | null>(null);

    return (
        <>
            <Iq7Table className={className}>
                <Iq7Table.HeadRow>
                    <th>
                        Name{' '}
                        <EditFundingSourceModal
                            isOpen={!!selectedFundingSource}
                            onIsOpenChange={(isOpen) => {
                                if (!isOpen) setSelectedFundingSource(null);
                            }}
                            fundingSource={selectedFundingSource}
                        ></EditFundingSourceModal>
                    </th>
                    <th>Amount</th>
                    <th>Available</th>
                    <th>Recurring</th>
                </Iq7Table.HeadRow>
                <Iq7Table.Body>
                    {fundingSources.map((source) => (
                        <Iq7Table.Row
                            key={source.id}
                            onClick={(_) => {
                                setSelectedFundingSource(source);
                            }}
                            className='cursor-pointer hover:bg-base-300'
                        >
                            <td>{source.name}</td>
                            <td>{source.amount}</td>
                            <td>
                                {source.take_effect_date?.format('MMM D, YYYY')}
                            </td>
                            <td>
                                {source.use_recurrence &&
                                    `Every ${source.recurrence} ${
                                        source.recurrence_unit
                                    }(s) until ${
                                        source.recurrence_end?.format(
                                            'MMM D,YYYY'
                                        ) || 'forever'
                                    }`}
                            </td>
                        </Iq7Table.Row>
                    ))}
                </Iq7Table.Body>
            </Iq7Table>
        </>
    );
}

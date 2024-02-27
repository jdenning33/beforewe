'use client';

import Link from 'next/link';
import { Iq7Card } from '../../components/Iq7Card';
import { useEvent } from '../event-details/hooks/useEvent';

export function BudgetOverviewPanel({ className }: { className?: string }) {
    const { event } = useEvent();
    return (
        <div className='flex gap-2'>
            <Iq7Card.Subsection className='flex-auto relative'>
                <Link
                    className='absolute top-0 left-0 right-0 bottom-0'
                    href={`${event.alias}/budget`}
                ></Link>
                <Iq7Card.SubsectionTitle>
                    Available Funds
                </Iq7Card.SubsectionTitle>
                <p>$1000</p>
            </Iq7Card.Subsection>
            <Iq7Card.Subsection className='flex-auto flex gap-4 relative'>
                <Link
                    className='absolute top-0 left-0 right-0 bottom-0'
                    href={`${event.alias}/budget`}
                ></Link>
                <div>
                    <Iq7Card.SubsectionTitle>
                        Expected Costs
                    </Iq7Card.SubsectionTitle>
                    <p>$1000</p>
                </div>
                <div>
                    <Iq7Card.SubsectionTitle>
                        Remaining Balance
                    </Iq7Card.SubsectionTitle>
                    <p>$1000</p>
                </div>
            </Iq7Card.Subsection>
        </div>
    );
}

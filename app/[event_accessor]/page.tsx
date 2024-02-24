'use client';

import { Iq7Card } from '@/app/components/Iq7Card';
import { BudgetOverviewPanel } from '@/app/features/budget/BudgetOverviewPanel';
import { EventDetailsPanel } from '@/app/features/event-details/EventDetailsPanel';
import { useEvent } from '@/app/features/event-details/hooks/useEvent';

export default function EventPage() {
    return (
        <main className='p-8'>
            <div className='grid grid-flow-dense justify-center grid-cols-[repeat(auto-fit,minmax(15rem,auto))] gap-6'>
                <Iq7Card className='row-span-3 col-span-2'>
                    <Iq7Card.Body>
                        <EventDetailsPanel />
                    </Iq7Card.Body>
                </Iq7Card>
                <ToolCard className='col-span-2' title='Budget'>
                    <BudgetOverviewPanel className='col-span-2' />
                </ToolCard>
                <ToolCard title='Primer' />
                <ToolCard title='Timeline' />
                <ToolCard title='Guest List' />
                <ToolCard title='Seating Chart' />
                <ToolCard title='Photographer Shot List' />
            </div>
        </main>
    );
}

function ToolCard({
    children,
    className,
    title,
}: {
    children?: React.ReactNode;
    className?: string;
    title: string;
}) {
    const { event } = useEvent();

    return (
        <Iq7Card className={(!event.id ? 'opacity-50 ' : '') + className}>
            <Iq7Card.Title>{title}</Iq7Card.Title>
            <Iq7Card.Body>{children ?? 'Coming Soon'}</Iq7Card.Body>
        </Iq7Card>
    );
}

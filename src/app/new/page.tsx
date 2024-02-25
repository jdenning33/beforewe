'use client';

import { Iq7Card } from '@/src/components/Iq7Card';
import { EditEventDetailsPanel } from '@/src/features/event-details/EditEventDetailsPanel';
import { IUnsavedEvent } from '@/src/features/event-details/hooks/IEvent';

let defaultEvent: IUnsavedEvent = {
    moniker: '',
    fiance_1_name: '',
    fiance_2_name: '',
    primary_date: null,
    target_budget: null,
    event_size: null,
    name: '',
    image_url: '',
    is_public: false,
};

export default function NewEventPage() {
    return (
        <main className='p-8'>
            <div className='grid grid-flow-dense justify-center grid-cols-[repeat(auto-fit,minmax(15rem,auto))] gap-6'>
                <Iq7Card className='row-span-3 col-span-2'>
                    <Iq7Card.Body>
                        <EditEventDetailsPanel event={defaultEvent} />
                    </Iq7Card.Body>
                </Iq7Card>
                <ToolCard className='col-span-2' title='Budget'>
                    {/* <BudgetOverviewPanel className='col-span-2' /> */}
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
    return (
        <Iq7Card className={'opacity-50 ' + className}>
            <Iq7Card.Title>{title}</Iq7Card.Title>
            <Iq7Card.Body>{children ?? 'Coming Soon'}</Iq7Card.Body>
        </Iq7Card>
    );
}

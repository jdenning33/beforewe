import { Iq7Card } from '@/app/components/Iq7Card';
import { CoupleDetails } from '@/app/features/event-details/CoupleDetails';
import { useEvent } from './hooks/useEvent';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EditEventDetailsPanel } from './EditEventDetailsPanel';
import { useEvents } from './hooks/useEvents';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function EventDetailsPanel({ className }: { className?: string }) {
    const { event } = useEvent();

    const searchParams = useSearchParams();
    const edit = searchParams.has('edit');
    console.log('edit', edit);

    // const [isEditing, setIsEditing] = useState(event.id ? false : true);
    // useEffect(() => {
    //     setIsEditing(event.id ? false : true);
    // }, [event.id]);

    if (edit || !event.id) {
        return <EditEventDetailsPanel event={event} className={className} />;
    }

    return (
        <div className={'flex flex-col items-center gap-6 ' + className}>
            <CoupleDetails />
            <Countdown />
            <EventAlias />
            <Link href={`/${event.alias}?edit=true`}>
                <button>Edit</button>
            </Link>
        </div>
    );
}

export function Countdown() {
    const { event } = useEvent();
    if (!event.primary_date) return null;
    const daysUntilEvent = Math.max(
        event.primary_date?.diff(moment(), 'days'),
        0
    );
    return (
        <div className='font-mono text-5xl'>
            <span className='mr-2'>{daysUntilEvent}</span>
            days
        </div>
    );
}

export function EventAlias() {
    const { event } = useEvent();
    return (
        <div className='flex flex-col'>
            <span className='text-sm'>beforewe.co/{event.alias}</span>
        </div>
    );
}

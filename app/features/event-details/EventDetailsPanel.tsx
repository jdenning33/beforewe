import { Iq7Card } from '@/app/components/Iq7Card';
import { CoupleDetails } from '@/app/features/event-details/CoupleDetails';
import { useEvent } from './hooks/useEvent';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EditEventDetailsPanel } from './EditEventDetailsPanel';
import { useEvents } from './hooks/useEvents';

export function EventDetailsPanel({ className }: { className?: string }) {
    const { event } = useEvent();

    const [isEditing, setIsEditing] = useState(event.id ? false : true);
    useEffect(() => {
        console.log('event.id', event.id);
        setIsEditing(event.id ? false : true);
    }, [event.id]);

    if (isEditing) {
        return (
            <EditEventDetailsPanel
                afterSave={() => setIsEditing(false)}
                className={className}
            />
        );
    }

    return (
        <div className={'flex flex-col items-center gap-6 ' + className}>
            <CoupleDetails />
            <Countdown />
            <EventAlias />
            <button onClick={(_) => setIsEditing(true)}>Edit</button>
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

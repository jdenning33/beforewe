import { useEvent } from '../hooks/useEvent';
import moment from 'moment';
import { EditEventDetailsPanel } from './EditEventDetailsPanel';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PersonIcon } from '@/src/components/icons/PersonIcon';

export function EventDetailsPanel({ className }: { className?: string }) {
    const { event } = useEvent();

    const searchParams = useSearchParams();
    const edit = searchParams.has('edit');

    if (edit || !event.id) {
        return <EditEventDetailsPanel event={event} className={className} />;
    }

    return (
        <div className={'flex flex-col items-center gap-6 ' + className}>
            <div className='flex'>
                <div className='flex flex-col items-center'>
                    <PersonIcon className='h-32' />
                    {event.fiance_1_name}
                </div>
                <div className='flex flex-col items-center'>
                    <PersonIcon className='h-32' />
                    {event.fiance_2_name}
                </div>
            </div>
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

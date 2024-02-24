'use client';

import { useEffect } from 'react';
import { useEvents } from './features/event-details/hooks/useEvents';
import { useRouter } from 'next/navigation';
import NewEventPage from './new/page';

export default function Home() {
    const router = useRouter();
    const { events } = useEvents();

    useEffect(() => {
        try {
            const value = window.localStorage.getItem('localAccessId');
            let match = events.find((e) => e.access_id === value);
            if (!match && events.length) match = events[0];
            if (match) {
                router.push(`/${match.alias}`);
            }
        } catch (error) {
            console.error(error);
        }
    }, [events]);

    if (events.length) return <div>Redirecting...</div>;

    return <NewEventPage />;
}

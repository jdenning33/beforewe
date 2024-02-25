'use client';

import {
    EventProvider,
    useUrlMatchingEvent,
} from '@/src/features/event-details/hooks/useEvent';
import { useEvents } from '@/src/features/event-details/hooks/useEvents';
import { Suspense, useEffect, useState } from 'react';

export default function EventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { events } = useEvents();
    const { matchingEvent } = useUrlMatchingEvent();
    const [isGivingExtraLoadTime, setIsGivingExtraLoadTime] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsGivingExtraLoadTime(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Suspense fallback='Loading...'>
            {matchingEvent ? (
                <EventProvider event={matchingEvent}>{children}</EventProvider>
            ) : isGivingExtraLoadTime ? (
                'Loading...'
            ) : (
                <div>
                    <h1>No event found</h1>
                    <p>
                        Try creating a new event or selecting an existing event
                    </p>
                </div>
            )}
        </Suspense>
    );
}

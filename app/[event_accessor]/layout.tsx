'use client';

import {
    EventProvider,
    useEvent,
    useUrlMatchingEvent,
} from '../features/event-details/hooks/useEvent';

export default function EventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { matchingEvent } = useUrlMatchingEvent();

    if (!matchingEvent)
        return (
            <div>
                <h1>No event found</h1>
                <p>Try creating a new event or selecting an existing event</p>
            </div>
        );

    return <EventProvider event={matchingEvent}>{children}</EventProvider>;
}

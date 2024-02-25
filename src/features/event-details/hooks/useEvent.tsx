`use client`;

// Assuming IEvent and IUnsavedEvent are defined elsewhere correctly
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IEvent, IUnsavedEvent } from './IEvent';
import { useEvents } from './useEvents';
import { useParams } from 'next/navigation';

// Custom hook for finding the event that matches the URL
export const useUrlMatchingEvent = () => {
    const { events } = useEvents();
    const [matchingEvent, setMatchingEvent] = useState<IEvent | null>(null);
    const { event_accessor } = useParams();

    useEffect(() => {
        let matchingEvent = events.find((e) => e.alias == event_accessor);
        if (matchingEvent) setMatchingEvent(matchingEvent);
        else setMatchingEvent(null);
    }, [events, event_accessor]);

    return { matchingEvent: matchingEvent };
};

// Updating the interface to potentially hold a null value for event
interface EventState {
    event: IEvent | IUnsavedEvent;
}

// Define the context with a default value of null for its state
export const EventContext = createContext<EventState | null>(null);

// Define the provider component
export const EventProvider = ({
    children,
    event,
}: {
    children: React.ReactNode;
    event: IEvent;
}) => {
    return (
        <EventContext.Provider value={{ event }}>
            {children}
        </EventContext.Provider>
    );
};

// Custom hook for consuming the context
export const useEvent = (): EventState => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvent must be used within an EventProvider');
    }
    return context;
};

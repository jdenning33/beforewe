// store/useEventStore.ts
import { IEvent, IUnsavedEvent } from './IEvent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { deleteEvent, getEvents, upsertEvent } from './eventApiCalls';
import { useEffect } from 'react';
import useLocalAccessId from './useLocalAccessId';

type UseEventsType = {
    events: IEvent[];
    saveEvent: (event: IUnsavedEvent) => Promise<void>;
    deleteEvent: (event: IEvent) => Promise<void>;
};

export function useEvents(): UseEventsType {
    const { localAccessId, setLocalAccessId } = useLocalAccessId();
    const supabase = createClientComponentClient();
    const queryClient = useQueryClient();

    // Retrieve data from localStorage
    useEffect(() => {
        try {
            const value = window.localStorage.getItem('localAccessId');
            setLocalAccessId(value);
            console.log('localAccessId', value);
        } catch (error) {
            console.log(error);
        }
    }, []);

    //get data
    const { data: serverEvents } = useQuery({
        queryKey: ['getevents' + localAccessId],
        queryFn: () => getEvents(supabase, localAccessId),
        staleTime: 1 * 60 * 1000, // don't refetch data within 1 minute
    });

    //update data
    const upsertEventMutation = useMutation({
        mutationFn: (event: IUnsavedEvent) => upsertEvent(supabase, event),
        onSuccess: (data) => {
            console.log('event saved', data);
            try {
                window.localStorage.setItem(
                    'localAccessId',
                    data.access_id || ''
                );
                setLocalAccessId(data.access_id);
            } catch (error) {
                console.log(error);
            }
            queryClient.invalidateQueries({
                queryKey: ['getevents' + localAccessId],
            });
        },
    });

    //delete data
    const deleteEventMutation = useMutation({
        mutationFn: (event: IEvent) => deleteEvent(supabase, event),
        onSuccess: (data) => {
            console.log('event deleted', data);
            queryClient.invalidateQueries({
                queryKey: ['getevents' + localAccessId],
            });
        },
    });

    //exposed hooks
    async function saveEvent(event: IUnsavedEvent) {
        console.log('saving event', event);
        await upsertEventMutation.mutateAsync(event);
    }

    async function deleteEvent2(event: IEvent) {
        await deleteEventMutation.mutateAsync(event);
    }

    return { events: serverEvents || [], saveEvent, deleteEvent: deleteEvent2 };
}

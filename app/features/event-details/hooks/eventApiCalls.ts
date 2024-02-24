import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import moment from 'moment';
import { IEvent, IUnsavedEvent } from './IEvent';
import { Console } from 'console';

export const selectQuery = `
    id, 
    access_id,
    alias,
    moniker,
    name,
    fiance_1_name,
    fiance_2_name,
    primary_date,
    target_budget,
    event_size,
    created_at,
    image_url,
    is_public
`;

const mapEventQueryToIEvent = (e: any): IEvent => {
    var event: IEvent = {
        id: e.id,
        access_id: e.access_id,
        alias: e.alias ?? e.access_id,
        moniker: e.moniker,
        fiance_1_name: e.fiance_1_name,
        fiance_2_name: e.fiance_2_name,
        primary_date: moment(e.primary_date),
        target_budget: parseFloat(e.target_budget),
        event_size: e.event_size,
        created_at: moment(e.created_at),
        image_url: e.image_url,
        name: e.name,
        is_public: e.is_public,
    };
    return event;
};

export async function getEvents(
    supabase: SupabaseClient,
    localAccessId: string | null
) {
    console.log('fetchingEvents', localAccessId);

    var result = await supabase
        .from('event')
        .select(selectQuery)
        .or(
            `is_public.eq.false${
                localAccessId ? ',access_id.eq.' + localAccessId : ''
            }`
        )
        .order('id');
    if (result.error) throw result.error;
    return result.data.map(mapEventQueryToIEvent);
}

export async function getEvent(
    supabase: SupabaseClient,
    eventAccessor: string
) {
    var result = await supabase
        .from('event')
        .select(selectQuery)
        .eq('access_id', eventAccessor);
    if (result.error) throw result.error;
    return result.data.map(mapEventQueryToIEvent).at(0);
}

export async function deleteEvent(supabase: SupabaseClient, event: IEvent) {
    if (!event.id) throw new Error('Event must have an id');
    var result = await supabase
        .from('event')
        .delete()
        .eq('id', event.id)
        .select();
    if (result.error) throw result.error;
    if (result.data.length == 0) throw new Error('Event to delete not found');
    return result.data.at(0).id;
}

export async function upsertEvent(
    supabase: SupabaseClient,
    event: IUnsavedEvent
): Promise<IEvent> {
    let { error, data } = await supabase.from('event').upsert(event).select();
    var updatedEvent = data?.at(0);
    if (error) throw error;

    return updatedEvent;
}

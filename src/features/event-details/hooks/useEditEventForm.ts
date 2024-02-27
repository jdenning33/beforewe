import moment from 'moment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IEvent, IUnsavedEvent } from './IEvent';
import { useAuthUser } from '../../user/hooks/useAuthUser';
import { useEvents } from './useEvents';
import { useRouter } from 'next/navigation';

export function useEditEventForm(event: IEvent | IUnsavedEvent) {
    const { isSignedIn } = useAuthUser();
    const { saveEvent, deleteEvent, events } = useEvents();
    const router = useRouter();

    const { handleSubmit, control, watch } = useForm<IEvent>({
        defaultValues: {
            ...event,
            primary_date: event.primary_date?.format('YYYY-MM-DD'),
            alias: event.alias == 'new-event' ? '' : event.alias,
        },
        mode: 'onChange',
    });

    let fiance_1_name = watch('fiance_1_name');
    let fiance_2_name = watch('fiance_2_name');
    let primary_date = watch('primary_date');
    let date = primary_date ? moment(primary_date) : null;
    let aliasValue =
        fiance_1_name && fiance_2_name && date
            ? `${fiance_1_name}-${fiance_2_name}-${date.format(
                  'YYYY'
              )}`.toLowerCase()
            : '';
    aliasValue = '' + aliasValue.replace(/[^a-zA-Z0-9-]/g, '');

    const onSubmit: SubmitHandler<IEvent> = async (data) => {
        let newEvent: IUnsavedEvent = {
            ...event,
            fiance_1_name: data.fiance_1_name,
            fiance_2_name: data.fiance_2_name,
            primary_date: data.primary_date ? moment(data.primary_date) : null,
            name: event.name
                ? event.name
                : data.fiance_1_name + ' & ' + data.fiance_2_name,
            alias:
                data.alias && data.alias?.trim() != ''
                    ? data.alias?.trim()
                    : aliasValue,
            is_public: isSignedIn ? false : true,
        };
        try {
            await saveEvent(newEvent);
            router.push('/' + newEvent.alias);
        } catch (e: any) {
            alert('Error saving event: ' + e.message);
            console.error('Error', e);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                if (event.id) await deleteEvent(event as IEvent);
                let otherEvents = events.filter((e) => e.id != event.id);
                if (otherEvents.length > 0)
                    router.push('/' + otherEvents[0].alias);
                else router.push('/new');
            } catch (e: any) {
                alert('Error deleting event: ' + e.message);
                console.error('Error', e);
            }
        }
    };

    return {
        handleSubmit: handleSubmit(onSubmit),
        handleDelete,
        control,
        aliasValue,
        onSubmit,
    };
}

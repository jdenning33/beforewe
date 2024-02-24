import { PersonIcon } from '@/app/components/icons/PersonIcon';

import { Iq7Input } from '@/app/components/Iq7Input';
import { IEvent, IUnsavedEvent } from './hooks/IEvent';
import { useEvents } from './hooks/useEvents';
import { useAuthUser } from '../user/hooks/useAuthUser';
import { useRouter } from 'next/navigation';
import { useEditEventForm } from './hooks/useEditEventForm';
import Link from 'next/link';

export function EditEventDetailsPanel({
    className,
    event,
}: {
    className?: string;
    event: IEvent | IUnsavedEvent;
}) {
    const router = useRouter();
    const { isSignedIn } = useAuthUser();
    const { deleteEvent } = useEvents();
    const { handleSubmit, control, aliasValue } = useEditEventForm(event);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 items-center justify-between h-full'
        >
            <div className='flex gap-2 items-end'>
                <div className='flex flex-col items-center'>
                    <PersonIcon className='h-32' />

                    <Iq7Input
                        inputClassName='text-center'
                        placeholder='Fiance Name'
                        name='fiance_1_name'
                        control={control}
                        rules={{ required: 'This field is required.' }}
                    />
                </div>
                <div className='text-xl font-medium'>&</div>
                <div className='flex flex-col items-center'>
                    <PersonIcon className='h-32' />

                    <Iq7Input
                        inputClassName='text-center'
                        placeholder='Fiance Name'
                        name='fiance_2_name'
                        control={control}
                        rules={{ required: 'This field is required.' }}
                    />
                </div>
            </div>

            <div className='font-medium'>ARE GETTING MARRIED</div>

            <Iq7Input
                placeholder='Wedding Date'
                type='date'
                name='primary_date'
                control={control}
                rules={{ required: true }}
            />

            <div className='flex w-full'>
                {event.id ? (
                    <>
                        <div className='flex-1'></div>
                        <button
                            className='btn btn-sm btn-primary w-fit'
                            type='submit'
                        >
                            Save Event
                        </button>
                        <div className='flex-1 flex justify-end'>
                            <Link href={`/${event.alias}`}>
                                <button className='btn btn-sm btn-primary btn-ghost w-fit'>
                                    Cancel
                                </button>
                            </Link>

                            <button
                                className='btn btn-sm btn-primary btn-ghost w-fit xhidden'
                                onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    try {
                                        await deleteEvent(event as IEvent);
                                        router.push('/');
                                    } catch (e: any) {
                                        alert(
                                            'Error deleting event: ' + e.message
                                        );
                                    }
                                }}
                            >
                                Delete Event
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex-1 flex items-center gap-2 justify-center'>
                            beforewe.co/
                            <Iq7Input
                                placeholder={aliasValue || 'your-event-url'}
                                name='alias'
                                control={control}
                                rules={{
                                    required: false,
                                    pattern: {
                                        value: /^[a-zA-Z0-9-]*$/,
                                        message:
                                            'You may only use letters, numbers and hyphens (-).',
                                    },
                                }}
                            />
                            <button
                                className='btn btn-sm btn-primary w-fit'
                                type='submit'
                            >
                                {event.id ? 'Save Event' : 'Create Event'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </form>
    );
}

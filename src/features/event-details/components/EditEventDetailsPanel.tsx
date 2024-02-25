import { IEvent, IUnsavedEvent } from '../hooks/IEvent';
import { useEvents } from '../hooks/useEvents';
import { useAuthUser } from '../../user/hooks/useAuthUser';
import { useRouter } from 'next/navigation';
import { useEditEventForm } from '../hooks/useEditEventForm';
import Link from 'next/link';
import { PersonIcon } from '@/src/components/icons/PersonIcon';
import { Iq7Input } from '@/src/components/Iq7Input';
import {
    Iq7Button,
    Iq7GhostButton,
    Iq7IconButton,
    Iq7PrimaryButton,
} from '@/src/components/Iq7Button';

export function EditEventDetailsPanel({
    className,
    event,
}: {
    className?: string;
    event: IEvent | IUnsavedEvent;
}) {
    const router = useRouter();
    const { isSignedIn } = useAuthUser();
    const { handleSubmit, handleDelete, control, aliasValue } =
        useEditEventForm(event);

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
                        <div className='flex-1'>
                            <Iq7GhostButton
                                className='absolute top-1 right-1 opacity-0 hover:opacity-100'
                                title='Delete this event. This action cannot be undone.'
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                            >
                                Delete
                            </Iq7GhostButton>
                        </div>
                        <Iq7PrimaryButton type='submit'>
                            Save Event
                        </Iq7PrimaryButton>
                        <div className='flex-1 flex justify-end group relative'>
                            <Link href={`/${event.alias}`}>
                                <Iq7GhostButton>Cancel</Iq7GhostButton>
                            </Link>
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
                            <Iq7PrimaryButton type='submit'>
                                {event.id ? 'Save Event' : 'Create Event'}
                            </Iq7PrimaryButton>
                        </div>
                    </>
                )}
            </div>
        </form>
    );
}

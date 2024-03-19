'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { Iq7FormInput } from '@/src/components/Form/Iq7FormInput';
import { useForm } from 'react-hook-form';
import { Iq7PrimaryButton } from '@/src/components/Iq7Button';
import { Iq7FormSelect } from '@/src/components/Form/Iq7FormSelect';
import { likelyToInviteOptions } from './GuestColumns';

export function EditGuestForm({
    guest,
    afterSave,
}: {
    guest: Omit<IGuest, 'id'>;
    afterSave?: () => void;
}) {
    const { saveGuest, deleteGuest, guestRelationships } = useGuests();
    const { handleSubmit, control, register, reset } = useForm<IGuest>({
        defaultValues: {
            ...guest,
        },
        mode: 'onChange',
    });

    function onSubmit(formData: IGuest) {
        const guestData = { ...guest, ...formData };
        saveGuest(guestData);
        reset();
        afterSave?.();
    }

    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-2'>
                <Iq7FormInput
                    inputClassName='w-full'
                    name='first_name'
                    label='First Name'
                    control={control}
                    rules={{
                        required: 'First Name is required',
                    }}
                />
                <Iq7FormInput
                    inputClassName='w-full'
                    name='last_name'
                    label='Last Name'
                    control={control}
                />
            </div>
            <Iq7FormSelect
                inputClassName='w-full'
                name='relationship'
                label='Relationship'
                control={control}
            >
                {guestRelationships.map((relationship) => (
                    <option key={relationship} value={relationship || 'none'}>
                        {relationship}
                    </option>
                ))}
            </Iq7FormSelect>
            <Iq7FormSelect
                name='should_invite_score'
                label='Will Invite?'
                control={control}
            >
                {likelyToInviteOptions.map(([score, label]) => (
                    <option key={score} value={score}>
                        {label}
                    </option>
                ))}
            </Iq7FormSelect>
            <div className='flex gap-2'>
                <Iq7FormInput
                    inputClassName='w-full'
                    name='email'
                    label='Email'
                    control={control}
                    rules={{
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Invalid email address',
                        },
                    }}
                />
                <Iq7FormInput
                    name='phone_number'
                    label='Phone Number'
                    size={10}
                    control={control}
                    rules={{
                        pattern: {
                            // format 555-555-5555
                            value: /^\d{3}-\d{3}-\d{4}$/,
                            message:
                                'Invalid phone number, please use format 555-555-5555',
                        },
                    }}
                />
            </div>
            <Iq7PrimaryButton type='submit'>Save</Iq7PrimaryButton>
        </form>
    );
}

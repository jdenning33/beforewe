'use client';
import { Iq7FormInput } from '@/src/components/Form/Iq7FormInput';
import { useForm } from 'react-hook-form';
import { Iq7PrimaryButton } from '@/src/components/Iq7Button';
import {
    Envelope,
    useGuestCommunication,
} from '../hooks/useGuestCommunication';

export function EditAddressForm({
    address,
    afterSave,
}: {
    address?: Partial<Envelope>;
    afterSave: (address: Envelope) => void;
}) {
    const { saveEnvelope } = useGuestCommunication();
    const { control, handleSubmit } = useForm<Envelope>({
        defaultValues: {
            to: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            ...address,
        },
    });

    const onSubmit = (data: Envelope) => {
        console.log('save address', data);
        saveEnvelope(data);
        afterSave(data);
    };

    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
            <Iq7FormInput
                placeholder='Guest Name(s)'
                name='to'
                inputClassName='w-full'
                control={control}
            />
            <Iq7FormInput
                placeholder='Street'
                name='street'
                inputClassName='w-full'
                control={control}
            />
            <div className='flex gap-2'>
                <Iq7FormInput
                    placeholder='City'
                    name='city'
                    inputClassName='w-full'
                    control={control}
                />
                <Iq7FormInput
                    placeholder='State'
                    name='state'
                    size={3}
                    inputClassName='w-full'
                    control={control}
                />
                <Iq7FormInput
                    placeholder='Zip'
                    name='zip'
                    size={5}
                    control={control}
                />
            </div>
            <Iq7PrimaryButton>Save</Iq7PrimaryButton>
        </form>
    );
}

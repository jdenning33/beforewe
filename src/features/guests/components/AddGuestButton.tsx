'use client';
import { useGuests } from '../hooks/useGuests';
import { Iq7AccentButton } from '@/src/components/Iq7Button';
import { defaultGuest } from '../../../app/landing/guests/page';

export function AddGuestButton() {
    const { saveGuest } = useGuests();
    return (
        <Iq7AccentButton
            className='m-2'
            onClick={(_) => {
                saveGuest({
                    ...defaultGuest,
                    group_id: Math.random() * 10000,
                });
            }}
        >
            New Guest
        </Iq7AccentButton>
    );
}

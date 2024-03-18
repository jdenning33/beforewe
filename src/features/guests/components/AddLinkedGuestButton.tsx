'use client';
import { useGuests } from '../hooks/useGuests';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { defaultGuest } from '../../../app/landing/guests/page';

export function AddLinkedGuestButton({ groupId }: { groupId: string }) {
    const { saveGuest } = useGuests();
    return (
        <Iq7GhostButton
            className='mx-2 whitespace-nowrap'
            onClick={(_) => {
                saveGuest({
                    ...defaultGuest,
                    group_id: +groupId,
                });
            }}
        >
            Add Linked Guest
        </Iq7GhostButton>
    );
}

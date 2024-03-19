'use client';
import { useGuests } from '../hooks/useGuests';
import { Iq7GhostButton } from '@/src/components/Iq7Button';
import { defaultGuest } from '@/src/features/guests/hooks/defaultGuest';
import { EditGuestModal } from './EditGuestModal';
import { ManagePartyModal } from './ManagePartyModal';
import { GroupIcon } from '../../../components/icons/GroupIcon';

export function ManagePartyButton({ groupId }: { groupId: number }) {
    const { saveGuest } = useGuests();
    return (
        <ManagePartyModal groupId={groupId} title='Adding Party Member'>
            <div title='Manage Party'>
                <GroupIcon className='mx-2 opacity-70 hover:opacity-100' />
            </div>
        </ManagePartyModal>
    );
}

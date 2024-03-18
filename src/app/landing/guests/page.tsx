'use client';
import { Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { IGuest } from '../../../features/guests/hooks/useGuests';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';
import { GuestList } from '../../../features/guests/components/GuestList';
import { AddGuestButton } from '../../../features/guests/components/AddGuestButton';
import {
    GuestListStateProvider,
    useGuestListState,
} from '../../../features/guests/hooks/useGuestListState';

export const defaultGuest: Omit<IGuest, 'id'> = {
    first_name: '',
    last_name: '',
    relationship: '',
    should_invite_score: 3,
    group_id: 0,
};

export default function GuestsPage() {
    return (
        <GuestListStateProvider>
            <div>
                <Iq7PageTitle>Guest List</Iq7PageTitle>

                <div className='mb-8'>
                    Track the guests that you might be inviting to your wedding.
                </div>
                <div className='mb-8'>
                    Wat part of the process are you at?
                    <ActiveGuestViewToggle />
                </div>
                <div>
                    <GuestList />
                    <AddGuestButton />
                </div>
            </div>
        </GuestListStateProvider>
    );
}

function ActiveGuestViewToggle() {
    const { purpose, setPurpose } = useGuestListState();
    return (
        <Iq7ToggleGroup
            value={purpose}
            onValueChange={(v) => setPurpose(v as any)}
        >
            <Iq7ToggleGroup.Item value='deciding'>
                Deciding Who's Invited
            </Iq7ToggleGroup.Item>
            <Iq7ToggleGroup.Item value='collecting'>
                Collecting Contact Info
            </Iq7ToggleGroup.Item>
            <Iq7ToggleGroup.Item value='building'>
                Building Invitations
            </Iq7ToggleGroup.Item>
        </Iq7ToggleGroup>
    );
}

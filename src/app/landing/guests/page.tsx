'use client';
import { Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';
import { GuestList } from '../../../features/guests/components/GuestList';
import {
    GuestListStateProvider,
    useGuestListState,
} from '../../../features/guests/hooks/useGuestListState';
import { EditGuestModal } from '@/src/features/guests/components/EditGuestModal';
import { ManagePartyModal } from '@/src/features/guests/components/ManagePartyModal';
import { defaultGuest } from '../../../features/guests/hooks/defaultGuest';

export default function GuestsPage() {
    return (
        <GuestListStateProvider>
            <div>
                <Iq7PageTitle>Guest List</Iq7PageTitle>

                <div className='mb-8'>
                    Track the guests that you might be inviting to your wedding.
                </div>
                <div className='mb-8'>
                    What are we doing today?
                    <ActiveGuestViewToggle />
                </div>
                <div>
                    <GuestList />
                    <div className='mt-4 flex gap-2'>
                        <AddGuestButton />
                        <AddGuestPartyButton />
                    </div>
                </div>
            </div>
        </GuestListStateProvider>
    );
}

function AddGuestButton() {
    return (
        <EditGuestModal title='New Guest' guest={{ ...defaultGuest }}>
            <div className='btn btn-sm btn-accent flex justify-start whitespace-nowrap rounded'>
                New Individual Guest
            </div>
        </EditGuestModal>
    );
}
function AddGuestPartyButton() {
    return (
        <ManagePartyModal title='New Party' groupId={Math.random() * 1000}>
            <div className='btn btn-sm xbtn-accent btn-outline flex justify-start whitespace-nowrap rounded'>
                New Guest Party
            </div>
        </ManagePartyModal>
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
                Tracking Communication
            </Iq7ToggleGroup.Item>
        </Iq7ToggleGroup>
    );
}

'use client';
import { Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { Iq7Table } from '@/src/components/Iq7Table';
import { IGuest, useGuests } from './useGuests';
import {
    Iq7AccentButton,
    Iq7GhostButton,
    Iq7OutlineButton,
    Iq7PrimaryButton,
} from '@/src/components/Iq7Button';
import { IGuestGroup, useGuestGroups } from './useGuestGroups';
import { useMemo } from 'react';
import { useLocalItem } from '@/src/utils/useLocalItem';

export default function GuestsPage() {
    return (
        <div>
            <Iq7PageTitle>Guest List</Iq7PageTitle>

            <div className='mb-8'>
                Track the guests that you might be inviting to your wedding.
            </div>
            <div className='mb-8'>
                Wat part of the process are you at?
                <div className='flex gap-2 '>
                    <button className='btn btn-sm'>
                        Deciding Who's Invited
                    </button>
                    <button className='btn btn-sm'>Building Invitations</button>
                </div>
            </div>
            <div>
                <GuestList />
            </div>
        </div>
    );
}

type GuestsInGroup = {
    group: IGuestGroup;
    guests: IGuest[];
};
function GuestList() {
    const { guests, saveGuest, deleteGuest } = useGuests();
    const { guestGroups, saveGuestGroup } = useGuestGroups();

    const guestsByGroup = useMemo(() => {
        return guestGroups.map((group) => {
            return {
                group,
                guests: guests.filter((g) => g.group_id == group.id),
            };
        });
    }, [guests, guestGroups]);

    return (
        <>
            <Iq7Table>
                <Iq7Table.HeadRow>
                    <th></th>
                    <th>Name</th>
                    <th>Invite?</th>
                </Iq7Table.HeadRow>
                <Iq7Table.Body>
                    {guestsByGroup.map((group) => (
                        <>
                            <Iq7Table.Row>
                                <td rowSpan={group.guests.length + 2}>
                                    {group.group.name}
                                </td>
                            </Iq7Table.Row>
                            {group.guests.map((guest) => (
                                <GuestRow guest={guest} />
                            ))}
                            <Iq7Table.Row>
                                <Iq7OutlineButton
                                    className='m-2'
                                    onClick={(_) => {
                                        saveGuest({
                                            name: 'New Guest',
                                            plus_count: 0,
                                            should_invite_score: 3,
                                            group_id: group.group.id,
                                            invitation_id: 0,
                                        });
                                    }}
                                >
                                    Add Guest
                                </Iq7OutlineButton>
                            </Iq7Table.Row>
                        </>
                    ))}
                </Iq7Table.Body>
            </Iq7Table>
            <div className='flex gap-2 mt-4'>
                <Iq7PrimaryButton
                    onClick={() => {
                        saveGuestGroup({
                            name: 'Group',
                        });
                    }}
                >
                    Add Group
                </Iq7PrimaryButton>
            </div>
        </>
    );
}
function GuestRow({ guest }: { guest: IGuest }) {
    const { localItem: localGuest, setLocalItem: setLocalGuest } =
        useLocalItem(guest);
    return (
        <Iq7Table.Row>
            <td>{localGuest.name}</td>
            <td className=''>
                <button
                    onClick={(_) =>
                        setLocalGuest({ ...localGuest, should_invite_score: 1 })
                    }
                    className={`btn btn-xs ${
                        localGuest.should_invite_score === 1 ? 'btn-active' : ''
                    }`}
                >
                    No
                </button>
                <button
                    onClick={(_) =>
                        setLocalGuest({ ...localGuest, should_invite_score: 2 })
                    }
                    className={`btn btn-xs ${
                        localGuest.should_invite_score === 2 ? 'btn-active' : ''
                    }`}
                >
                    Maybe
                </button>
                <button
                    onClick={(_) =>
                        setLocalGuest({ ...localGuest, should_invite_score: 3 })
                    }
                    className={`btn btn-xs ${
                        localGuest.should_invite_score === 3 ? 'btn-active' : ''
                    }`}
                >
                    Probably
                </button>
                <button
                    onClick={(_) =>
                        setLocalGuest({ ...localGuest, should_invite_score: 4 })
                    }
                    className={`btn btn-xs ${
                        localGuest.should_invite_score === 4 ? 'btn-active' : ''
                    }`}
                >
                    Yes
                </button>
            </td>
        </Iq7Table.Row>
    );
}

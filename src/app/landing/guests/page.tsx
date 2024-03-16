'use client';
import { Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import { Iq7Table } from '@/src/components/Iq7Table';
import { IGuest, useGuests } from './useGuests';
import { Iq7AccentButton, Iq7OutlineButton } from '@/src/components/Iq7Button';
import { IGuestGroup } from './useGuestGroups';
import { useMemo } from 'react';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';

export default function GuestsPage() {
    const { guests, saveGuest, deleteGuest } = useGuests();

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
                <Iq7AccentButton
                    className='m-2'
                    onClick={(_) => {
                        saveGuest({
                            name: 'New Guest',
                            plus_count: 0,
                            should_invite_score: 3,
                            relationship: 'Friend',
                            group_id: Math.random() * 10000,
                            invitation_id: 0,
                        });
                    }}
                >
                    New Guest
                </Iq7AccentButton>
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

    const guestsByGroup = useMemo(() => {
        const groups: { [id: number]: IGuest[] } = {};
        guests.forEach((guest) => {
            let key = guest.group_id || guest.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(guest);
        });
        return groups;
    }, [guests]);

    return (
        <>
            <Iq7Table>
                <Iq7Table.HeadRow>
                    <th>Name</th>
                    <th>Relation</th>
                    <th>Invite?</th>
                    <th></th>
                </Iq7Table.HeadRow>
                <Iq7Table.Body>
                    {Object.entries(guestsByGroup).map(
                        ([groupId, groupGuests]) => (
                            <>
                                {groupGuests.map((guest, index) => (
                                    <GuestRow guest={guest}>
                                        {index == 0 ? (
                                            <td rowSpan={groupGuests.length}>
                                                <Iq7OutlineButton
                                                    className='m-2'
                                                    onClick={(_) => {
                                                        saveGuest({
                                                            name: 'New Guest',
                                                            plus_count: 0,
                                                            should_invite_score: 3,
                                                            relationship:
                                                                'Friend',
                                                            group_id: +groupId,
                                                            invitation_id: 0,
                                                        });
                                                    }}
                                                >
                                                    Add Linked Guest
                                                </Iq7OutlineButton>
                                            </td>
                                        ) : null}
                                    </GuestRow>
                                ))}
                            </>
                        )
                    )}
                </Iq7Table.Body>
            </Iq7Table>
        </>
    );
}
function GuestRow({
    guest,
    children,
}: {
    guest: IGuest;
    children?: React.ReactNode;
}) {
    const { saveGuest } = useGuests();

    const likelyToInviteOptions = [
        [4, 'Yes'],
        [3, 'Probably'],
        [2, 'If Possible'],
        [1, 'No'],
    ] as [number, string][];

    return (
        <Iq7Table.Row>
            <td>{guest.name}</td>
            <td>{guest.relationship}</td>
            <td className='btn-group'>
                <Iq7ToggleGroup
                    value={guest.should_invite_score + ''}
                    onValueChange={(v) =>
                        saveGuest({ ...guest, should_invite_score: +v })
                    }
                >
                    {likelyToInviteOptions.map(([score, label]) => (
                        <Iq7ToggleGroup.Item key={score} value={score + ''}>
                            {label}
                        </Iq7ToggleGroup.Item>
                    ))}
                </Iq7ToggleGroup>
            </td>
            {children}
        </Iq7Table.Row>
    );
}

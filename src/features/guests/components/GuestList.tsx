'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { GuestColumnDefinition, useGuestColumns } from './GuestColumns';
import { ManagePartyButton } from './ManagePartyButton';
import { useGuestsByGroupList } from '../hooks/useGuestsByGroup';
import { useGuestListState } from '@/src/features/guests/hooks/useGuestListState';
import { IGuest } from '../hooks/useGuests';
import { ManageEnvelopeButton } from './ManageEnvelopeButton';
import { useGuestCommunication } from '../hooks/useGuestCommunication';
import { useState } from 'react';

export function GuestList({}: {}) {
    const guestsByGroup = useGuestsByGroupList();
    const { envelopeAssignments, envelopes, saveEnvelope } =
        useGuestCommunication();

    const allColumns = useGuestColumns();
    const { activeColumns } = useGuestListState();
    const columns = activeColumns.map((col) => allColumns[col]);

    const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);

    return (
        <div className='overflow-auto max-h-[70vh] min-h-[10rem] xw-fit border'>
            <Iq7Table>
                <Iq7Table.Head>
                    <Iq7Table.HeadRow className='bg-base-200'>
                        {/* Guest Column Labels */}
                        {activeColumns.map((col) =>
                            (() => {
                                switch (col) {
                                    case 'full_name_link':
                                    case 'first_name':
                                    case 'last_name':
                                    case 'relationship':
                                    case 'relationship_select':
                                    case 'should_invite_score':
                                    case 'should_invite_score_select':
                                    case 'email':
                                    case 'phone_number':
                                    case 'address':
                                    case 'delete':
                                        return (
                                            <th key={col}>
                                                {allColumns[col].th}
                                            </th>
                                        );
                                    case 'manage_group':
                                        return <th key={col}></th>;
                                    default:
                                        return col;
                                }
                            })()
                        )}
                    </Iq7Table.HeadRow>
                </Iq7Table.Head>
                {guestsByGroup.map((group, groupIndex) => (
                    <Iq7Table.Body className='border-y-2 xhover:font-bold odd:bg-gray-300 odd:bg-opacity-20 group/guestgroup'>
                        {/* Guest Column Cells */}
                        {group.guests.map((guest, index) => (
                            <Iq7Table.Row
                                className={`group ${
                                    hoveredGroupId === group.groupId
                                        ? '!bg-base-200 '
                                        : ' '
                                }`}
                                key={guest.id}
                            >
                                {activeColumns.map((col) =>
                                    (() => {
                                        switch (col) {
                                            case 'full_name_link':
                                            case 'first_name':
                                            case 'last_name':
                                            case 'relationship':
                                            case 'relationship_select':
                                            case 'should_invite_score':
                                            case 'should_invite_score_select':
                                            case 'email':
                                            case 'phone_number':
                                            case 'delete':
                                                return (
                                                    <td className='p-1'>
                                                        {allColumns[col].td(
                                                            guest
                                                        )}
                                                    </td>
                                                );
                                            case 'address':
                                                return (
                                                    index == 0 && (
                                                        <td
                                                            className='m-1 p-1 group-hover/guestgroup:bg-base-200'
                                                            onMouseEnter={() => {
                                                                setHoveredGroupId(
                                                                    guest.group_id ||
                                                                        guest.id
                                                                );
                                                            }}
                                                            onMouseLeave={() => {
                                                                setHoveredGroupId(
                                                                    null
                                                                );
                                                            }}
                                                            rowSpan={
                                                                group.guests
                                                                    .length
                                                            }
                                                        >
                                                            <ManageEnvelopeButton
                                                                envelope={
                                                                    envelopes.find(
                                                                        (
                                                                            envelope
                                                                        ) =>
                                                                            envelope.guest_group_id ===
                                                                            group.groupId
                                                                    ) || {
                                                                        guest_group_id:
                                                                            guest.group_id ||
                                                                            guest.id,
                                                                        to: buildEnvelopeName(
                                                                            group.guests
                                                                        ),
                                                                        zip: '',
                                                                        street: '',
                                                                        city: '',
                                                                        state: '',
                                                                    }
                                                                }
                                                            />
                                                        </td>
                                                    )
                                                );
                                            case 'manage_group':
                                                return (
                                                    index == 0 && (
                                                        <td
                                                            className='text-center m-1 p-1 group-hover/guestgroup:bg-base-200'
                                                            onMouseEnter={() => {
                                                                setHoveredGroupId(
                                                                    guest.group_id ||
                                                                        guest.id
                                                                );
                                                            }}
                                                            onMouseLeave={() => {
                                                                setHoveredGroupId(
                                                                    null
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                setHoveredGroupId(
                                                                    null
                                                                );
                                                            }}
                                                            rowSpan={
                                                                group.guests
                                                                    .length
                                                            }
                                                        >
                                                            <ManagePartyButton
                                                                groupId={
                                                                    group.groupId
                                                                }
                                                            />
                                                        </td>
                                                    )
                                                );
                                            default:
                                                return col;
                                        }
                                    })()
                                )}
                            </Iq7Table.Row>
                        ))}
                    </Iq7Table.Body>
                ))}
            </Iq7Table>
        </div>
    );
}

function buildEnvelopeName(guests: IGuest[]) {
    if (guests.length === 0) return 'Guest';

    //guests have different last names
    if (guests.some((g) => g.last_name != guests[0].last_name)) {
        return guests
            .map((g) => g.first_name + ' ' + g.last_name)
            .join(' and ');
    }

    //guests are all the same last name
    if (guests.length > 2) {
        return 'The ' + guests[0].last_name + ' Family';
    }

    return (
        guests.map((g) => g.first_name).join(' and ') +
        ' ' +
        guests[0].last_name
    );
}

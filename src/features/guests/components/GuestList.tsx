'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { GuestColumnDefinition, useGuestColumns } from './GuestColumns';
import { ManagePartyButton } from './ManagePartyButton';
import {
    useGuestsByGroup,
    useGuestsByGroupList,
} from '../hooks/useGuestsByGroup';
import { useGuestListState } from '@/src/features/guests/hooks/useGuestListState';
import { IGuest } from '../hooks/useGuests';
import { EditGuestModal } from './EditGuestModal';
import { ManageEnvelopeButton } from './ManageEnvelopeButton';
import { useGuestCommunication } from '../hooks/useGuestCommunication';
import { useState } from 'react';
import { env } from 'process';

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
                        {columns.map((col) => (
                            <th key={col.th}>{col.th}</th>
                        ))}
                        <th className='w-0'></th>
                        <th className='w-0'></th>
                    </Iq7Table.HeadRow>
                </Iq7Table.Head>
                {guestsByGroup.map((group, groupIndex) => (
                    <Iq7Table.Body className='border-y-2 xhover:font-bold odd:bg-gray-300 odd:bg-opacity-20 group/guestgroup'>
                        {/* Guest Column Cells */}
                        {group.guests.map((guest, index) => (
                            <GuestRow
                                className={
                                    hoveredGroupId === group.groupId
                                        ? '!bg-base-200 '
                                        : ' '
                                }
                                key={guest.id}
                                guest={guest}
                                columns={columns}
                            >
                                <>
                                    {index == 0 && (
                                        <td
                                            className='m-1 p-1 group-hover/guestgroup:bg-base-200'
                                            onMouseEnter={() => {
                                                setHoveredGroupId(
                                                    guest.group_id || guest.id
                                                );
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredGroupId(null);
                                            }}
                                            rowSpan={group.guests.length}
                                        >
                                            <ManageEnvelopeButton
                                                envelope={
                                                    envelopes.find(
                                                        (envelope) =>
                                                            envelope.guest_group_id ===
                                                            group.groupId
                                                    ) || {
                                                        guest_group_id:
                                                            guest.group_id ||
                                                            guest.id,
                                                        to: getAddressDefaultTo(
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
                                    )}
                                    {index === 0 && (
                                        <td
                                            className='p-1 px-4 border-l w-0 group-hover/guestgroup:bg-base-200'
                                            onMouseEnter={() => {
                                                setHoveredGroupId(
                                                    group.groupId
                                                );
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredGroupId(null);
                                            }}
                                            rowSpan={group.guests.length}
                                        >
                                            <ManagePartyButton
                                                groupId={group.groupId}
                                            />
                                        </td>
                                    )}
                                </>
                            </GuestRow>
                        ))}
                    </Iq7Table.Body>
                ))}
            </Iq7Table>
        </div>
    );
}

function getAddressDefaultTo(guests: IGuest[]) {
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

function GuestRow({
    className,
    guest,
    columns,
    children,
    ...props
}: {
    className: string;
    guest: IGuest;
    columns: GuestColumnDefinition[];
    children?: React.ReactNode;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
>) {
    return (
        <Iq7Table.Row
            className={`group cursor-pointer border-none ${className}`}
            {...props}
        >
            <>
                {columns.map((col) => (
                    <td key={col.th} className='p-1'>
                        {col.td(guest)}
                    </td>
                ))}
                {children}
            </>
        </Iq7Table.Row>
    );
}

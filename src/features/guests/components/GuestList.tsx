'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { GuestColumns, useGuestColumns } from './GuestColumns';
import { AddLinkedGuestButton } from './AddLinkedGuestButton';
import { useGuestsByGroup } from '../hooks/useGuestsByGroup';
import { useGuestListState } from '@/src/features/guests/hooks/useGuestListState';

export function GuestList({}: {}) {
    const guestsByGroup = useGuestsByGroup();
    const allColumns = useGuestColumns();
    const { activeColumns } = useGuestListState();
    const columns = activeColumns.map((col) => allColumns[col]);

    return (
        <div className='overflow-auto max-h-[70vh] min-h-[10rem]'>
            <Iq7Table>
                <Iq7Table.Head>
                    <Iq7Table.HeadRow>
                        {/* Guest Column Labels */}
                        {columns.map((col) => (
                            <th key={col.th}>{col.th}</th>
                        ))}
                        <th></th>
                    </Iq7Table.HeadRow>
                </Iq7Table.Head>
                {Object.entries(guestsByGroup).map(([groupId, groupGuests]) => (
                    <Iq7Table.Body className='border-y-2 xhover:font-bold'>
                        {/* Add Linked Guest Column */}
                        <tr className='border-none'>
                            <td className='p-0' colSpan={columns.length}></td>
                            <td
                                className='p-1'
                                rowSpan={groupGuests.length + 1}
                            >
                                <AddLinkedGuestButton groupId={groupId} />
                            </td>
                        </tr>
                        {/* Guest Column Cells */}
                        {groupGuests.map((guest) => (
                            <Iq7Table.Row key={guest.id} className='group'>
                                {columns.map((col) => (
                                    <td key={col.th} className='p-1 '>
                                        {col.td(guest)}
                                    </td>
                                ))}
                            </Iq7Table.Row>
                        ))}
                    </Iq7Table.Body>
                ))}
            </Iq7Table>
        </div>
    );
}

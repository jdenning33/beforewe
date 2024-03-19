'use client';
import { Iq7Table } from '@/src/components/Iq7Table';
import { GuestColumnDefinition, useGuestColumns } from './GuestColumns';
import { ManagePartyButton } from './ManagePartyButton';
import { useGuestsByGroup } from '../hooks/useGuestsByGroup';
import { useGuestListState } from '@/src/features/guests/hooks/useGuestListState';
import { IGuest } from '../hooks/useGuests';
import { EditGuestModal } from './EditGuestModal';

export function GuestList({}: {}) {
    const guestsByGroup = useGuestsByGroup();
    const allColumns = useGuestColumns();
    const { activeColumns } = useGuestListState();
    const columns = activeColumns.map((col) => allColumns[col]);

    return (
        <div className='overflow-auto max-h-[70vh] min-h-[10rem] w-fit'>
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
                                <ManagePartyButton groupId={+groupId} />
                            </td>
                        </tr>
                        {/* Guest Column Cells */}
                        {groupGuests.map((guest) => (
                            <GuestRow
                                key={guest.id}
                                guest={guest}
                                columns={columns}
                            />
                        ))}
                    </Iq7Table.Body>
                ))}
            </Iq7Table>
        </div>
    );
}

function GuestRow({
    guest,
    columns,
}: {
    guest: IGuest;
    columns: GuestColumnDefinition[];
}) {
    return (
        <EditGuestModal title='Edit Guest' guest={guest}>
            {(openModal) => (
                <Iq7Table.Row
                    className='group cursor-pointer'
                    onClick={openModal}
                >
                    {columns.map((col) => (
                        <td key={col.th} className='p-1'>
                            {col.td(guest)}
                        </td>
                    ))}
                </Iq7Table.Row>
            )}
        </EditGuestModal>
    );
}

'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { useState } from 'react';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { EditGuestForm } from './EditGuestForm';
import { Iq7QuickTabs, Iq7Tabs } from '@/src/components/Iq7Tabs';
import { Iq7Table } from '@/src/components/Iq7Table';
import { Iq7TextInput } from '@/src/components/NonFormInputs/Iq7TextInput';
import { set } from 'react-hook-form';
import { useGuestsByGroup } from '../hooks/useGuestsByGroup';
import { group } from 'console';
import { defaultGuest } from '@/src/features/guests/hooks/defaultGuest';

export function ManagePartyModal({
    title,
    groupId,
    children,
}: {
    title: string;
    groupId: number;
    children?: React.ReactNode | ((openModal: () => void) => React.ReactNode);
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Iq7Dialog isOpen={isModalOpen} onIsOpenChange={setIsModalOpen}>
                <Iq7Dialog.Content2>
                    <Iq7Dialog.Title>Manage Party</Iq7Dialog.Title>

                    <div className='font-medium p-1'>Guests in Party</div>
                    <ExistingGuestTable groupId={groupId} />
                    <br />
                    <div className='font-medium p-1'>Add Guest to Party</div>
                    <Iq7QuickTabs
                        defaultTab='new'
                        tabs={[
                            {
                                value: 'new',
                                label: 'New Guest',
                                content: (
                                    <EditGuestForm
                                        guest={{
                                            ...defaultGuest,
                                            group_id: +groupId,
                                        }}
                                        afterSave={() => null}
                                    />
                                ),
                            },
                            {
                                value: 'existing',
                                label: 'Existing Guest',
                                content: (
                                    <LinkExistingGuestPanel groupId={groupId} />
                                ),
                            },
                        ]}
                    />
                </Iq7Dialog.Content2>
                {typeof children === 'function' ? (
                    children(() => setIsModalOpen(true))
                ) : (
                    <Iq7Dialog.Trigger>{children}</Iq7Dialog.Trigger>
                )}
            </Iq7Dialog>
        </>
    );
}
function LinkExistingGuestPanel({ groupId }: { groupId: number | undefined }) {
    const { saveGuest } = useGuests();
    const guestsByGroup = useGuestsByGroup();
    const [searchText, setSearchText] = useState('');
    return (
        <div>
            <div className='mb-2'>
                <Iq7TextInput
                    className='w-full'
                    placeholder='Search for a guest'
                    name='search'
                    value={searchText}
                    instant={true}
                    onValueChange={setSearchText}
                />
            </div>
            <div className='max-h-72 overflow-auto'>
                <Iq7Table>
                    <Iq7Table.Head>
                        <Iq7Table.HeadRow>
                            <th>Name</th>
                            <th>Relationship</th>
                            <th></th>
                        </Iq7Table.HeadRow>
                    </Iq7Table.Head>
                    {Object.entries(guestsByGroup)
                        .filter(
                            ([gId, groupGuests]) =>
                                groupId != +gId &&
                                groupGuests.some((guest) =>
                                    (guest.first_name + guest.last_name)
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                                )
                        )
                        .sort(
                            ([gId1, groupGuests1], [gId2, groupGuests2]) =>
                                groupGuests1.length - groupGuests2.length
                        )
                        .map(([gId, groupGuests]) => (
                            <Iq7Table.Body className='border-y-2'>
                                <tr>
                                    <td className='p-0' colSpan={2}></td>
                                    <td
                                        className='py-0 text-right'
                                        rowSpan={1 + groupGuests.length}
                                        title={
                                            groupGuests.length > 1
                                                ? 'Guest is already in a different party.'
                                                : ''
                                        }
                                    >
                                        <button
                                            className='btn btn-secondary btn-xs'
                                            disabled={groupGuests.length > 1}
                                            onClick={() => {
                                                console.log(
                                                    'Add guest to party'
                                                );
                                                groupGuests.forEach((guest) => {
                                                    console.log(guest);
                                                    saveGuest({
                                                        ...guest,
                                                        group_id: groupId,
                                                    });
                                                });
                                            }}
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                                {groupGuests.map((guest) => (
                                    <tr key={guest.id}>
                                        <td>
                                            {guest.first_name} {guest.last_name}
                                        </td>
                                        <td>{guest.relationship}</td>
                                    </tr>
                                ))}
                            </Iq7Table.Body>
                        ))}
                </Iq7Table>
            </div>
        </div>
    );
}

function ExistingGuestTable({ groupId }: { groupId: number | undefined }) {
    const { saveGuest } = useGuests();
    const guestsByGroup = useGuestsByGroup();
    return (
        <div className='bg-white rounded-lg'>
            <Iq7Table>
                <Iq7Table.Head>
                    <Iq7Table.HeadRow>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th></th>
                    </Iq7Table.HeadRow>
                </Iq7Table.Head>
                <Iq7Table.Body>
                    {Object.entries(guestsByGroup)
                        .filter(([gId, groupGuests]) => groupId == +gId)
                        .map(([gId, groupGuests]) =>
                            groupGuests.map((guest) => (
                                <tr key={guest.id}>
                                    <td>
                                        {guest.first_name} {guest.last_name}
                                    </td>
                                    <td>{guest.relationship}</td>
                                    <td
                                        className='py-0 text-right'
                                        title={
                                            guest.id == +gId
                                                ? 'Guest is the primary member of the party.'
                                                : ''
                                        }
                                    >
                                        <button
                                            className='btn btn-outline btn-xs'
                                            disabled={guest.id == +gId}
                                            onClick={() => {
                                                console.log(
                                                    'Remove guest from party'
                                                );
                                                saveGuest({
                                                    ...guest,
                                                    group_id: undefined,
                                                });
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                </Iq7Table.Body>
            </Iq7Table>
        </div>
    );
}

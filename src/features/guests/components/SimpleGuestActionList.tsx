'use client';
import { IGuest } from '../hooks/useGuests';
import { ReactNode, useState } from 'react';
import { Iq7Table } from '@/src/components/Iq7Table';
import { Iq7TextInput } from '@/src/components/NonFormInputs/Iq7TextInput';
import { GuestGroup } from '../hooks/useGuestsByGroup';

export function SimpleGuestActionList({
    guestsByGroup,
    groupAction,
    guestAction,
    useSearch = false,
    className,
}: {
    guestsByGroup: GuestGroup[];
    guestAction?: (guest: IGuest) => ReactNode;
    groupAction?: (guestGroup: GuestGroup) => ReactNode;
    useSearch?: boolean;
    className?: string;
}) {
    const [searchText, setSearchText] = useState('');
    return (
        <div className={className}>
            {useSearch && (
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
            )}
            <div className='max-h-72 overflow-auto bg-white border'>
                <Iq7Table>
                    <Iq7Table.Head>
                        <Iq7Table.HeadRow>
                            <th>Name</th>
                            <th>Relationship</th>
                            {groupAction && <th></th>}
                            {guestAction && <th></th>}
                        </Iq7Table.HeadRow>
                    </Iq7Table.Head>
                    {guestsByGroup
                        .filter((group) =>
                            group.guests.some((guest) =>
                                (guest.first_name + guest.last_name)
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                            )
                        )
                        .map(({ groupId, guests }) => (
                            <Iq7Table.Body className='border-y-2'>
                                {groupAction && (
                                    <tr>
                                        <td className='p-0' colSpan={2}></td>
                                        <td
                                            className='py-0 text-right border-l'
                                            rowSpan={1 + guests.length}
                                        >
                                            {groupAction({ groupId, guests })}
                                        </td>
                                    </tr>
                                )}
                                {guests.map((guest) => (
                                    <tr key={guest.id}>
                                        <td>
                                            {guest.first_name} {guest.last_name}
                                        </td>
                                        <td>{guest.relationship}</td>
                                        {guestAction && (
                                            <td className='py-0 text-right'>
                                                {guestAction(guest)}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </Iq7Table.Body>
                        ))}
                </Iq7Table>
            </div>
        </div>
    );
}

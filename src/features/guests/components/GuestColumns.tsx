'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';
import { Iq7TextInput } from '@/src/components/NonFormInputs/Iq7TextInput';
import { Iq7Select } from '@/src/components/NonFormInputs/Iq7SelectInput';

export type GuestColumns = {
    first_name: GuestColumnDefinition;
    last_name: GuestColumnDefinition;
    relationship: GuestColumnDefinition;
    should_invite_score: GuestColumnDefinition;
    should_invite_score_select: GuestColumnDefinition;
    email: GuestColumnDefinition;
    phone_number: GuestColumnDefinition;
    address: GuestColumnDefinition;
    delete: GuestColumnDefinition;
};
type GuestColumnDefinition = {
    th: string;
    td: (guest: IGuest) => React.ReactNode;
};
export const useGuestColumns = (): GuestColumns => {
    const { saveGuest, deleteGuest } = useGuests();
    const likelyToInviteOptions = [
        [4, 'Yes'],
        [3, 'Probably'],
        [2, 'If Possible'],
        [1, 'No'],
    ] as [number, string][];

    return {
        first_name: {
            th: 'First Name',
            td: (guest: IGuest) => (
                <Iq7TextInput
                    name='first_name'
                    autoComplete='off'
                    value={guest.first_name}
                    className='min-w-full'
                    placeholder='First Name'
                    onValueChange={(v) =>
                        saveGuest({ ...guest, first_name: v })
                    }
                    groupSneaky={true}
                />
            ),
        },
        last_name: {
            th: 'Last Name',
            td: (guest: IGuest) => (
                <Iq7TextInput
                    name='last_name'
                    autoComplete='off'
                    value={guest.last_name}
                    className='min-w-full'
                    onValueChange={(v) => saveGuest({ ...guest, last_name: v })}
                    groupSneaky={true}
                />
            ),
        },
        relationship: {
            th: 'Relation',
            td: (guest: IGuest) => (
                <Iq7TextInput
                    name='relationship'
                    value={guest.relationship}
                    className='min-w-full'
                    onValueChange={(v) =>
                        saveGuest({ ...guest, relationship: v })
                    }
                    groupSneaky={true}
                />
            ),
        },
        should_invite_score: {
            th: 'Invite?',
            td: (guest: IGuest) => (
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
            ),
        },
        should_invite_score_select: {
            th: 'Invite?',
            td: (guest: IGuest) => (
                <Iq7Select
                    groupSneaky={true}
                    value={guest.should_invite_score + ''}
                    className='min-w-full'
                    onValueChange={(v) =>
                        saveGuest({ ...guest, should_invite_score: +v })
                    }
                >
                    {likelyToInviteOptions.map(([score, label]) => (
                        <Iq7Select.Item key={score} value={score + ''}>
                            {label}
                        </Iq7Select.Item>
                    ))}
                </Iq7Select>
            ),
        },
        email: {
            th: 'Email',
            td: (guest: IGuest) => (
                <Iq7TextInput
                    value={guest.email}
                    className='min-w-full'
                    onValueChange={(v) => saveGuest({ ...guest, email: v })}
                    groupSneaky={true}
                />
            ),
        },
        phone_number: {
            th: 'Phone',
            td: (guest: IGuest) => (
                <Iq7TextInput
                    value={guest.phone_number}
                    className='min-w-full'
                    onValueChange={(v) =>
                        saveGuest({ ...guest, phone_number: v })
                    }
                    groupSneaky={true}
                />
            ),
        },
        address: { th: 'Address', td: (guest: IGuest) => '' },
        delete: {
            th: '',
            td: (guest: IGuest) => (
                <button
                    className='btn btn-circle btn-xs btn-ghost'
                    onClick={() => {
                        if (
                            confirm(
                                'Are you sure you want to delete guest, ' +
                                    guest.first_name +
                                    ' ' +
                                    guest.last_name +
                                    '? This cannot be undone.'
                            )
                        ) {
                            deleteGuest(guest.id);
                        }
                    }}
                >
                    {/* trashcan icon */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-2/3 h-2/3 fill-base-content opacity-80'
                        viewBox='0 0 24 24'
                    >
                        <path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
                    </svg>
                </button>
            ),
        },
    };
};

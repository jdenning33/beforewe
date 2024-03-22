'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';
import { Iq7TextInput } from '@/src/components/NonFormInputs/Iq7TextInput';
import { Iq7Select } from '@/src/components/NonFormInputs/Iq7SelectInput';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { Iq7Button } from '@/src/components/Iq7Button';
import { EditGuestForm } from './EditGuestForm';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { ManageEnvelopeButton } from './ManageEnvelopeButton';
import { EditGuestModal } from './EditGuestModal';
import { en } from '@supabase/auth-ui-shared';
import { useGuestCommunication } from '../hooks/useGuestCommunication';
import { useGuestsByGroup } from '../hooks/useGuestsByGroup';

export type GuestColumns = {
    full_name_link: GuestColumnDefinition;
    first_name: GuestColumnDefinition;
    last_name: GuestColumnDefinition;
    relationship: GuestColumnDefinition;
    relationship_select: GuestColumnDefinition;
    should_invite_score: GuestColumnDefinition;
    should_invite_score_select: GuestColumnDefinition;
    email: GuestColumnDefinition;
    phone_number: GuestColumnDefinition;
    address: GuestColumnDefinition;
    delete: GuestColumnDefinition;
};
export type GuestColumnDefinition = {
    th: string;
    td: (guest: IGuest) => React.ReactNode;
};
export const likelyToInviteOptions = [
    [4, 'Yes'],
    [3, 'Probably'],
    [2, 'If Possible'],
    [1, 'No'],
] as [number, string][];
export const useGuestColumns = (): GuestColumns => {
    const { guests, saveGuest, deleteGuest, guestRelationships } = useGuests();
    const guestsByGroup = useGuestsByGroup();
    const { createEnvelopeWithGuests, envelopes, envelopeAssignments } =
        useGuestCommunication();

    return {
        full_name_link: {
            th: 'Guest Name',
            td: (guest: IGuest) => (
                <EditGuestModal title='Edit Guest' guest={guest}>
                    <span className='pl-2 font-medium hover:underline opacity-90 hover:opacity-100'>
                        {guest.first_name + ' ' + guest.last_name}
                    </span>
                </EditGuestModal>
            ),
        },

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
        relationship_select: {
            th: 'Relation',
            td: (guest: IGuest) => (
                <Iq7Select
                    value={guest.relationship}
                    className='min-w-full'
                    onValueChange={(v) =>
                        saveGuest({ ...guest, relationship: v })
                    }
                    groupSneaky={true}
                >
                    {guestRelationships.map((relationship) => (
                        <Iq7Select.Item
                            key={relationship}
                            value={relationship || 'none'}
                        >
                            {relationship}
                        </Iq7Select.Item>
                    ))}
                </Iq7Select>
            ),
        },
        should_invite_score: {
            th: 'Invite?',
            td: (guest: IGuest) => (
                <div onClick={(e) => e.stopPropagation()}>
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
                </div>
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
        address: {
            th: 'Address',
            td: (guest: IGuest) => {
                const envelopeAssignment = envelopeAssignments.find(
                    (ea) => ea.guestId === guest.id
                );
                const envelope = envelopeAssignment
                    ? envelopes.find(
                          (e) => e.id === envelopeAssignment.envelopeId
                      )
                    : undefined;
                const guestGroup = guestsByGroup[guest.group_id || guest.id];
                if (!envelope)
                    return (
                        <div
                            onClick={(e) => {
                                createEnvelopeWithGuests(
                                    {
                                        guest_group_id:
                                            guest.group_id || guest.id,
                                        to: guestGroup
                                            .map((g) => g.first_name)
                                            .join(' '),
                                        zip: '',
                                        street: '',
                                        city: '',
                                        state: '',
                                    },
                                    guestGroup?.map((g) => g.id) || []
                                );
                            }}
                        >
                            Add Envelope {envelopeAssignment?.id}
                        </div>
                    );
                return <ManageEnvelopeButton envelope={envelope} />;
            },
        },
        delete: {
            th: '',
            td: (guest: IGuest) => (
                <button
                    className='btn btn-circle btn-xs btn-ghost'
                    onClick={(e) => {
                        e.stopPropagation();
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
                    <TrashIcon className='w-2/3 h-2/3 fill-base-content opacity-80' />
                </button>
            ),
        },
    };
};

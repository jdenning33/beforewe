'use client';
import { IGuest } from '../hooks/useGuests';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { useEffect, useState } from 'react';
import { SimpleGuestActionList } from './SimpleGuestActionList';
import { useGuestsByGroupList } from '../hooks/useGuestsByGroup';
import { EditAddressForm } from './EditAddressForm';
import {
    Envelope,
    useGuestCommunication,
} from '../hooks/useGuestCommunication';
import { Iq7ToggleGroup } from '@/src/components/NonFormInputs/Iq7ToggleGroup';
import { useGuestListState } from '../hooks/useGuestListState';

export function ManageEnvelopeModal({
    isOpen,
    envelope,
    children,
}: {
    isOpen: boolean;
    envelope: Envelope;
    children: React.ReactNode;
}) {
    const { setEnvelopeToManage } = useGuestListState();
    const guestsByGroup = useGuestsByGroupList();

    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const {
        envelopeAssignments,
        saveEnvelope,
        addGuestToEnvelope,
        removeGuestFromEnvelope,
    } = useGuestCommunication();
    console.log('envelope', envelope, isOpen);
    return (
        <Iq7Dialog
            isOpen={isOpen}
            onIsOpenChange={(v) => !v && setEnvelopeToManage(undefined)}
        >
            <Iq7Dialog.Trigger>{children}</Iq7Dialog.Trigger>
            <Iq7Dialog.Content2>
                <Iq7Dialog.Title>Manage Envelope</Iq7Dialog.Title>
                Address
                <div className='bg-white rounded p-2'>
                    {!isEditingAddress && envelope ? (
                        <div className='flex items-center justify-between'>
                            <div className=' min-h-16'>
                                <div className='font-medium'>{envelope.to}</div>
                                <div>{envelope.street}</div>
                                <div>
                                    {envelope.city}
                                    {envelope.city &&
                                        envelope.state &&
                                        ','}{' '}
                                    {envelope.state} {envelope.zip}
                                </div>
                            </div>
                            <button
                                className='btn btn-xs btn-outline'
                                onClick={() => setIsEditingAddress(true)}
                            >
                                Edit
                            </button>
                        </div>
                    ) : (
                        <EditAddressForm
                            address={envelope}
                            afterSave={(envelope) => {
                                saveEnvelope(envelope);
                                setIsEditingAddress(false);
                            }}
                        />
                    )}
                </div>
                <br />
                Party guests being addressed:
                <SimpleGuestActionList
                    guestsByGroup={guestsByGroup.filter(
                        (group) => group.groupId == envelope.guest_group_id
                    )}
                    guestAction={(guest) => (
                        <div className='flex justify-end'>
                            <Iq7ToggleGroup
                                value={
                                    envelopeAssignments.some(
                                        (ea) =>
                                            ea.envelopeId == envelope.id &&
                                            ea.guestId == guest.id
                                    )
                                        ? 'yes'
                                        : 'no'
                                }
                                onValueChange={(v) => {
                                    console.log('value change', v);
                                    if (v == 'yes') {
                                        addGuestToEnvelope(
                                            guest.id,
                                            envelope.id
                                        );
                                    } else if (v == 'no') {
                                        removeGuestFromEnvelope(
                                            guest.id,
                                            envelope.id
                                        );
                                    } else {
                                        console.log('value change', v);
                                    }
                                }}
                            >
                                <Iq7ToggleGroup.Item value='yes'>
                                    Yes
                                </Iq7ToggleGroup.Item>
                                <Iq7ToggleGroup.Item value='no'>
                                    No
                                </Iq7ToggleGroup.Item>
                            </Iq7ToggleGroup>
                        </div>
                    )}
                />
                {/* <br />
                Add a guest to address:
                <SimpleGuestActionList
                    useSearch
                    guestsByGroup={guestsByGroup.filter(
                        (group) =>
                            group.groupId != guest.group_id &&
                            group.groupId != guest.id
                    )}
                    guestAction={(guest) => (
                        <button
                            className='btn btn-xs btn-ghost'
                            title='Add to this envelope'
                        >
                            Add
                        </button>
                    )}
                /> */}
            </Iq7Dialog.Content2>
        </Iq7Dialog>
    );
}

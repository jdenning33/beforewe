'use client';
import { useGuests } from '../hooks/useGuests';
import { useState } from 'react';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { EditGuestForm } from './EditGuestForm';
import { Iq7QuickTabs } from '@/src/components/Iq7Tabs';
import { useGuestsByGroupList } from '../hooks/useGuestsByGroup';
import { defaultGuest } from '@/src/features/guests/hooks/defaultGuest';
import { SimpleGuestActionList } from './SimpleGuestActionList';
import { useEditDrawerState } from '../../edit-drawer/useEditDrawerState';

export function ManagePartyModal({
    title,
    groupId,
    children,
}: {
    title: string;
    groupId: number | undefined;
    children?: React.ReactNode | ((openModal: () => void) => React.ReactNode);
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trueGroupId, setTrueGroupId] = useState(
        groupId || Math.random() * 1000
    );
    const drawer = useEditDrawerState();

    return (
        <>
            {typeof children === 'function' ? (
                children(() => setIsModalOpen(true))
            ) : (
                <button
                    onClick={(_) =>
                        drawer.push({
                            title: 'Manage Party',
                            content: <ManagePartyPanel groupId={trueGroupId} />,
                        })
                    }
                >
                    {children}
                </button>
            )}
        </>
    );
}

export function ManagePartyPanel({ groupId }: { groupId: number }) {
    return (
        <div>
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
                                    group_id: groupId,
                                }}
                                afterSave={() => null}
                            />
                        ),
                    },
                    {
                        value: 'existing',
                        label: 'Existing Guest',
                        content: <LinkExistingGuestPanel groupId={groupId} />,
                    },
                ]}
            />
        </div>
    );
}

export function ManagePartyModal2({
    title,
    groupId,
    children,
}: {
    title: string;
    groupId: number | undefined;
    children?: React.ReactNode | ((openModal: () => void) => React.ReactNode);
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trueGroupId, setTrueGroupId] = useState(
        groupId || Math.random() * 1000
    );
    return (
        <>
            <Iq7Dialog
                isOpen={isModalOpen}
                onIsOpenChange={(open) => {
                    setIsModalOpen(open);
                    setTrueGroupId(groupId || Math.random() * 1000);
                }}
            >
                <Iq7Dialog.Content2>
                    <Iq7Dialog.Title>Manage Party</Iq7Dialog.Title>

                    <div className='font-medium p-1'>Guests in Party</div>
                    <ExistingGuestTable groupId={trueGroupId} />
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
                                            group_id: trueGroupId,
                                        }}
                                        afterSave={() => null}
                                    />
                                ),
                            },
                            {
                                value: 'existing',
                                label: 'Existing Guest',
                                content: (
                                    <LinkExistingGuestPanel
                                        groupId={trueGroupId}
                                    />
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
    const guestsByGroup = useGuestsByGroupList();
    const [searchText, setSearchText] = useState('');
    return (
        <div>
            <SimpleGuestActionList
                guestsByGroup={guestsByGroup
                    .filter(
                        (group) =>
                            groupId != group.groupId &&
                            group.guests.some((guest) =>
                                (guest.first_name + guest.last_name)
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                            )
                    )
                    .sort(
                        (group1, group2) =>
                            group1.guests.length - group2.guests.length
                    )}
                useSearch={true}
                groupAction={(group) => (
                    <button
                        className='btn btn-secondary btn-xs'
                        disabled={group.guests.length > 1}
                        onClick={() => {
                            console.log('Add guest to party');
                            group.guests.forEach((guest) => {
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
                )}
            />
        </div>
    );
}

function ExistingGuestTable({ groupId }: { groupId: number | undefined }) {
    const { saveGuest } = useGuests();
    const guestsByGroup = useGuestsByGroupList();
    return (
        <div className='bg-white rounded-lg'>
            <SimpleGuestActionList
                guestsByGroup={guestsByGroup.filter(
                    (group) => group.groupId == groupId
                )}
                guestAction={(guest) => (
                    <button
                        className='btn btn-outline btn-xs'
                        disabled={guest.id == groupId}
                        onClick={() => {
                            console.log('Remove guest from party');
                            saveGuest({
                                ...guest,
                                group_id: undefined,
                            });
                        }}
                    >
                        Remove
                    </button>
                )}
            />
        </div>
    );
}

'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { ManagePartyModal } from './ManagePartyModal';
import { GroupIcon } from '../../../components/icons/GroupIcon';
import { ManageEnvelopeModal } from './ManageEnvelopeModal';
import {
    Envelope,
    useGuestCommunication,
} from '../hooks/useGuestCommunication';
import { useGuestListState } from '../hooks/useGuestListState';
import { Iq7Button } from '@/src/components/Iq7Button';
import { useEffect } from 'react';

export function ManageEnvelopeButton({
    envelope,
}: {
    envelope: Envelope | (Omit<Envelope, 'id'> & { id?: number });
}) {
    const { saveGuest } = useGuests();
    const { setEnvelopeToManage } = useGuestListState();
    const { saveEnvelope } = useGuestCommunication();

    return (
        <div
            className='p-1 px-4 m-1 rounded min-h-12 min-w-36 text-xs bg-base-200 hover:bg-base-300 cursor-pointer hover:border-base-content shadow'
            title='Manage Party'
            onClick={(_) => {
                if (!envelope.id) {
                    let newId = saveEnvelope(envelope);
                    setEnvelopeToManage(newId);
                } else setEnvelopeToManage(envelope.id);
            }}
        >
            <div className='font-medium whitespace-nowrap'>{envelope.to}</div>
            <div>{envelope.street}</div>
            <div>
                {envelope.city}
                {envelope.city && envelope.state && ','} {envelope.state}{' '}
                {envelope.zip}
            </div>
        </div>
    );
}

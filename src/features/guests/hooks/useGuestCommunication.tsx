import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '@/src/utils/useSimpleZustandStore';
import { en } from '@supabase/auth-ui-shared';
import { useMemo } from 'react';

export type CommunicationCampaign = {
    id: number;
    name: number;
};
export type Envelope = {
    id: number;
    campaign_id?: string;
    guest_group_id: number;
    to: string;
    street: string;
    city: string;
    state: string;
    zip: string;
};
export type GuestEnvelopeAssignment = {
    id: number;
    guestId: number;
    envelopeId: number;
};

const useCommunicationCampaignStore =
    createSimpleZustandStore<CommunicationCampaign>();
const useEnvelopeStore = createSimpleZustandStore<Envelope>();
const useGuestEnvelopeAssignmentStore =
    createSimpleZustandStore<GuestEnvelopeAssignment>();

export function useGuestCommunication() {
    const envelopeStorage = useSimpleLocalStorage(
        useEnvelopeStore(),
        'envelopes'
    );
    const envelopeAssignmentStorage = useSimpleLocalStorage(
        useGuestEnvelopeAssignmentStore(),
        'guest-envelope-assignments'
    );
    const communicationCampaignStorage = useSimpleLocalStorage(
        useCommunicationCampaignStore(),
        'communication-campaigns'
    );

    const addGuestToEnvelope = (guestId: number, envelopeId: number) => {
        envelopeAssignmentStorage.saveItem({
            guestId,
            envelopeId,
        });
    };
    const removeGuestFromEnvelope = (guestId: number, envelopeId: number) => {
        console.log('removeGuestFromEnvelope', guestId, envelopeId);
        const envelopeAssignment = envelopeAssignmentStorage.items.find(
            (item) => item.guestId === guestId && item.envelopeId === envelopeId
        );
        if (!envelopeAssignment) return;
        envelopeAssignmentStorage.deleteItem(envelopeAssignment.id);
    };

    const createEnvelopeWithGuests = (
        envelope: Omit<Envelope, 'id'>,
        guestIds: number[]
    ) => {
        console.log('createEnvelopeWithGuests', envelope, guestIds);

        const savedEnvelopeId = envelopeStorage.saveItem(envelope);
        console.log('savedEnvelopeId', savedEnvelopeId);
        guestIds.forEach((guestId) => {
            addGuestToEnvelope(guestId, savedEnvelopeId);
        });
    };

    const envelopes = useMemo(
        () =>
            envelopeStorage.items.map((envelope) => ({
                ...envelope,
                extra: {
                    guests: envelopeAssignmentStorage.items
                        .filter((ea) => ea.envelopeId === envelope.id)
                        .map((ea) => ea.guestId),
                },
            })),
        [envelopeStorage.items, envelopeAssignmentStorage.items]
    );

    return {
        envelopes: envelopes,
        saveEnvelope: envelopeStorage.saveItem,
        createEnvelopeWithGuests: createEnvelopeWithGuests,
        deleteEnvelope: envelopeStorage.deleteItem,
        envelopeAssignments: envelopeAssignmentStorage.items,
        addGuestToEnvelope: addGuestToEnvelope,
        removeGuestFromEnvelope: removeGuestFromEnvelope,
        communicationCampaigns: communicationCampaignStorage.items,
        saveCommunicationCampaign: communicationCampaignStorage.saveItem,
        deleteCommunicationCampaign: communicationCampaignStorage.deleteItem,
    };
}

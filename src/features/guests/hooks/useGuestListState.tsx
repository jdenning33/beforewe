'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { GuestColumns } from '../components/GuestColumns';
import { Envelope, useGuestCommunication } from './useGuestCommunication';
import { ManageEnvelopeModal } from '../components/ManageEnvelopeModal';

type GuestListState = {
    activeColumns: (keyof GuestColumns)[];
    purpose: 'deciding' | 'collecting' | 'building';
    setPurpose: (purpose: 'deciding' | 'collecting' | 'building') => any;
    setEnvelopeToManage: (envelope: number | undefined) => any;
};
const GuestListStateContext = createContext<GuestListState | undefined>(
    undefined
);
export const GuestListStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [activeColumns, setActiveColumns] = useState<(keyof GuestColumns)[]>(
        []
    );
    const [purpose, setPurpose] = useState<
        'deciding' | 'collecting' | 'building'
    >('deciding');
    const [envelopeToManage, setEnvelopeToManage] = useState<number | null>();

    useEffect(() => {
        if (purpose == 'deciding') {
            setActiveColumns([
                'full_name_link',
                'relationship_select',
                'should_invite_score',
                'manage_group',
            ]);
        } else if (purpose == 'collecting') {
            setActiveColumns([
                'full_name_link',
                'email',
                'phone_number',
                'address',
                'manage_group',
            ]);
        } else if (purpose == 'building') {
            setActiveColumns([
                'full_name_link',
                'relationship_select',
                'should_invite_score_select',
                'email',
                'phone_number',
                'manage_group',
            ]);
        }
    }, [purpose]);

    const { envelopes } = useGuestCommunication();
    const envelopeToManageObject = envelopes.find(
        (e) => e.id === envelopeToManage
    );

    return (
        <GuestListStateContext.Provider
            value={{
                activeColumns,
                purpose,
                setPurpose,
                setEnvelopeToManage,
            }}
        >
            {envelopeToManageObject && (
                <ManageEnvelopeModal
                    isOpen={true}
                    envelope={envelopeToManageObject}
                >{``}</ManageEnvelopeModal>
            )}

            {children}
        </GuestListStateContext.Provider>
    );
};

export function useGuestListState(): GuestListState {
    const context = useContext(GuestListStateContext);
    if (context === undefined) {
        throw new Error(
            'useActiveColumnState must be used within a ActiveColumnProvider'
        );
    }
    return context;
}

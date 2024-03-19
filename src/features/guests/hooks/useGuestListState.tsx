'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { GuestColumns } from '../components/GuestColumns';

type GuestListState = {
    activeColumns: (keyof GuestColumns)[];
    purpose: 'deciding' | 'collecting' | 'building';
    setPurpose: (purpose: 'deciding' | 'collecting' | 'building') => any;
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

    useEffect(() => {
        if (purpose == 'deciding') {
            setActiveColumns([
                'full_name_link',
                'relationship_select',
                'should_invite_score',
                'delete',
            ]);
        } else if (purpose == 'collecting') {
            setActiveColumns([
                'first_name',
                'last_name',
                'email',
                'phone_number',
                'address',
                'delete',
            ]);
        } else if (purpose == 'building') {
            setActiveColumns([
                'full_name_link',
                'relationship',
                'should_invite_score_select',
                'email',
                'phone_number',
                'address',
                'delete',
            ]);
        }
    }, [purpose]);

    return (
        <GuestListStateContext.Provider
            value={{ activeColumns, purpose, setPurpose }}
        >
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

import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '@/src/utils/useSimpleZustandStore';
import { Envelope, useGuestCommunication } from './useGuestCommunication';

export type IGuest = {
    id: number;
    first_name: string;
    last_name: string;
    relationship: string;
    email?: string;
    phone_number?: string;
    should_invite_score: number;
    group_id?: number;
};

const useGuestStore = createSimpleZustandStore<IGuest>();

export function useGuests() {
    const guestLocalStorage = useSimpleLocalStorage(useGuestStore(), 'guests');
    return {
        guests: guestLocalStorage.items,
        guestRelationships: Array.from(
            new Set(
                guestLocalStorage.items
                    .map((g) => g.relationship)
                    .concat(['Family', 'Friend', 'Colleague'])
            )
        ),
        saveGuest: guestLocalStorage.saveItem,
        deleteGuest: guestLocalStorage.deleteItem,
    };
}

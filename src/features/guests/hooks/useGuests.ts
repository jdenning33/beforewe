import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '@/src/utils/useSimpleZustandStore';

export type IGuest = {
    id: number;
    first_name: string;
    last_name: string;
    relationship: string;
    email?: string;
    phone_number?: string;
    should_invite_score: number;
    group_id: number;
};

const useGuestStore = createSimpleZustandStore<IGuest>();

export function useGuests() {
    const localStorage = useSimpleLocalStorage(useGuestStore(), 'guests');
    return {
        guests: localStorage.items,
        saveGuest: localStorage.saveItem,
        deleteGuest: localStorage.deleteItem,
    };
}

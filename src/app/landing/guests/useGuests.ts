import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '@/src/utils/useSimpleZustandStore';

export type IGuest = {
    id: number;
    name: string;
    plus_count: number;
    should_invite_score: number;
    group_id: number;
    invitation_id: number;
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

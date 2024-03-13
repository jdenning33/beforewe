import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '@/src/utils/useSimpleZustandStore';

export type IGuestGroup = {
    id: number;
    name: string;
};

const useGuestGroupStore = createSimpleZustandStore<IGuestGroup>();

export function useGuestGroups() {
    const localStorage = useSimpleLocalStorage(
        useGuestGroupStore(),
        'guest-groups'
    );
    return {
        guestGroups: localStorage.items,
        saveGuestGroup: localStorage.saveItem,
        deleteGuestGroup: localStorage.deleteItem,
    };
}

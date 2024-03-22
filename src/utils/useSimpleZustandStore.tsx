import { useEffect, useState } from 'react';
import { create } from 'zustand';

type StoreState<T extends { id: K }, K = T['id']> = {
    items: T[];
    setItems: (item: T[]) => void;
    saveItem: (item: Omit<T, 'id'> & { id?: K }) => K;
    deleteItem: (id: number) => void;
};

export function createSimpleZustandStore<T extends { id: K }, K = T['id']>() {
    return create<StoreState<T>>((set) => ({
        items: [],
        setItems: (items) => {
            console.log('setItems', items);
            set({ items });
        },
        saveItem: (item) => {
            console.log('saveItem', item);
            let savedId = item.id;
            set((state) => {
                savedId = item.id || ((Math.random() * 100000) as K);
                let newItems = item.id
                    ? state.items.map((i) =>
                          i.id === item.id ? (item as T) : i
                      )
                    : [
                          ...state.items,
                          {
                              ...item,
                              id: savedId,
                          } as T,
                      ];
                console.log('newItems', newItems);
                return {
                    ...state,
                    items: newItems,
                };
            });
            return savedId as K;
        },
        deleteItem: (id) =>
            set((state) => ({
                items: state.items.filter((i) => i.id !== id),
            })),
    }));
}

export function useSimpleLocalStorage<T extends { id: K }, K = T['id']>(
    zustandStore: StoreState<T>,
    localStorageKey: string,
    mapToJson?: (items: T[]) => string,
    mapFromJson?: (json: string) => T[]
) {
    const { items, setItems, saveItem, deleteItem: deleteItem } = zustandStore;

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const storageJson = localStorage.getItem(localStorageKey) || '[]';
        const storageItems = mapFromJson
            ? mapFromJson(storageJson)
            : JSON.parse(storageJson);
        setItems(storageItems || []);
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;
        let storagePayload = mapToJson
            ? mapToJson(items)
            : JSON.stringify(items);
        localStorage.setItem(localStorageKey, storagePayload);
    }, [items]);

    return {
        items,
        setItems,
        saveItem,
        deleteItem,
    };
}

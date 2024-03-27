import { createContext, useContext, useState } from 'react';

type EditDrawState = {
    queue: DrawerItem[];
    push: (item: DrawerItem) => void;
    pop: () => void;
};
const EditDrawerContext = createContext<EditDrawState | undefined>(undefined);
export type DrawerItem = {
    title: string;
    content: React.ReactNode;
};
export function EditDrawerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [queue, setQueue] = useState<DrawerItem[]>([]);
    return (
        <EditDrawerContext.Provider
            value={{
                queue,
                push: (item) => {
                    setQueue((q) => [item, ...q]);
                    setOpen(true);
                },
                pop: () => {
                    setQueue((q) => q.slice(1));
                    if (queue.length == 1) {
                        setOpen(false);
                    }
                },
            }}
        >
            {children}
        </EditDrawerContext.Provider>
    );
}
export function useEditDrawerState() {
    const context = useContext(EditDrawerContext);
    if (context === undefined) {
        throw new Error(
            'useEditDrawer must be used within a EditDrawerProvider'
        );
    }
    return context;
}

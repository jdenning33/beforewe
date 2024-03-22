import { ReactNode, forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

export function Iq7Dialog({
    isOpen,
    onIsOpenChange,
    children,
}: {
    isOpen: boolean;
    onIsOpenChange: (isOpen: boolean) => void;
    children: ReactNode;
}) {
    return (
        <RadixDialog.Root open={isOpen} onOpenChange={onIsOpenChange}>
            {children}
        </RadixDialog.Root>
    );
}

Iq7Dialog.Uncontrolled = function Iq7DialogUncontrolled({
    children,
}: {
    children: ReactNode;
}) {
    return <RadixDialog.Root>{children}</RadixDialog.Root>;
};

Iq7Dialog.Trigger = RadixDialog.Trigger;
Iq7Dialog.Portal = RadixDialog.Portal;
Iq7Dialog.Overlay = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className }: { className?: string }, ref) => {
        return (
            <RadixDialog.Overlay
                ref={ref}
                className={`fixed z-[101] top-0 left-0 right-0 bottom-0 bg-base-content bg-opacity-40 ${className}`}
            />
        );
    }
);
Iq7Dialog.Overlay.displayName = 'Iq7DialogOverlay';

Iq7Dialog.Content2 = forwardRef<
    HTMLDivElement,
    { className?: string; children: ReactNode }
>(({ className, children }, ref) => {
    return (
        <RadixDialog.Portal>
            <Iq7Dialog.Overlay />
            <Iq7Dialog.Content>{children}</Iq7Dialog.Content>
        </RadixDialog.Portal>
    );
});

Iq7Dialog.Content = forwardRef<
    HTMLDivElement,
    { className?: string; children: ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className='fixed inset-0 flex w-screen items-center justify-center z-[102]'
        >
            <RadixDialog.Content
                className={`w-full max-w-sm rounded p-4 bg-base-200 shadow overflow-auto max-h-[90vh] ${className}`}
            >
                {children}
            </RadixDialog.Content>
        </div>
    );
});
Iq7Dialog.Content.displayName = 'Iq7DialogContent';

Iq7Dialog.Title = forwardRef<
    HTMLDivElement,
    { children: ReactNode; className?: string }
>(({ children, className }, ref) => {
    return (
        <RadixDialog.Title
            ref={ref}
            className={`text-lg font-bold mb-2 ${className}`}
            children={children}
        />
    );
});
Iq7Dialog.Title.displayName = 'Iq7DialogTitle';

Iq7Dialog.Description = forwardRef<
    HTMLDivElement,
    { children: ReactNode; className?: string }
>(({ children, className }, ref) => {
    return (
        <RadixDialog.Description
            ref={ref}
            className={`mb-4 ${className}`}
            children={children}
        />
    );
});
Iq7Dialog.Description.displayName = 'Iq7DialogDescription';

Iq7Dialog.Close = RadixDialog.Close;

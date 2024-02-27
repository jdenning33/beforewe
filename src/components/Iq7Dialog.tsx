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

Iq7Dialog.Trigger = RadixDialog.Trigger;
Iq7Dialog.Portal = RadixDialog.Portal;
Iq7Dialog.Overlay = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className }: { className?: string }, ref) => {
        return (
            <RadixDialog.Overlay
                ref={ref}
                className={`fixed z-10 top-0 left-0 right-0 bottom-0 bg-base-content bg-opacity-40 ${className}`}
            />
        );
    }
);
Iq7Dialog.Overlay.displayName = 'Iq7DialogOverlay';

Iq7Dialog.Content = forwardRef<
    HTMLDivElement,
    { className?: string; children: ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className='fixed inset-0 flex w-screen items-center justify-center z-20'
        >
            <RadixDialog.Content
                className={`w-full max-w-sm rounded  p-4 bg-base-200 shadow ${className}`}
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

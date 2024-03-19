import { ReactNode, forwardRef } from 'react';
import * as RadixToggle from '@radix-ui/react-toggle-group';

export function Iq7ToggleGroup({
    value,
    onValueChange,
    children,
}: {
    children: ReactNode;
    value: string;
    onValueChange: (value: string) => void;
}) {
    return (
        <RadixToggle.Root
            type='single'
            value={value}
            onValueChange={onValueChange}
            className='flex gap-[2px]'
        >
            {children}
        </RadixToggle.Root>
    );
}

Iq7ToggleGroup.Item = function ({
    value,
    children,
}: {
    value: string;
    children: ReactNode;
}) {
    return (
        <RadixToggle.Item
            className='btn btn-xs rounded-none first:rounded-l-lg last:rounded-r-lg data-[state=on]:btn-active'
            onClick={(e) => e.stopPropagation()}
            value={value}
        >
            {children}
        </RadixToggle.Item>
    );
};

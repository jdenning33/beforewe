import { ReactNode, forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import {
    groupSneakyInputClasses,
    inputClasses,
    sneakyInputClasses,
} from './inputStyles';

export function Iq7Select({
    value,
    onValueChange,
    sneaky = false,
    groupSneaky = false,
    className,
    children,
}: {
    children: ReactNode;
    value: string;
    onValueChange: (value: string) => void;
    sneaky?: boolean;
    groupSneaky?: boolean;
    className?: string;
}) {
    return (
        <RadixSelect.Root value={value} onValueChange={onValueChange}>
            <RadixSelect.Trigger
                className={`flex items-center justify-between border whitespace-nowrap pl-2 
                    ${inputClasses} 
                    ${sneaky ? sneakyInputClasses : ''} 
                    ${groupSneaky ? groupSneakyInputClasses : ''} 
                    ${className}
                `}
                aria-label='Food'
            >
                <RadixSelect.Value
                    className='whitespace-nowrap px-1'
                    placeholder='Select'
                />
                <RadixSelect.Icon className='px-1'>
                    <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        stroke='currentColor'
                        strokeWidth='3'
                    >
                        <path d='M6 9l6 6 6-6' />
                    </svg>
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content
                    className='z-100 rounded shadow absolute'
                    position='popper'
                >
                    <RadixSelect.Viewport className='z-100 bg-white'>
                        {children}
                    </RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
}

const SelectItem = forwardRef(
    (
        {
            children,
            className,
            ...props
        }: {
            children: ReactNode;
            className?: string;
        } & React.ComponentProps<typeof RadixSelect.Item>,
        forwardedRef
    ) => {
        return (
            <RadixSelect.Item
                className='flex items-center justify-between gap-3 pl-2 py-0 cursor-pointer hover:bg-base-200 whitespace-nowrap text-sm'
                {...props}
                ref={forwardedRef as any}
            >
                <RadixSelect.ItemText className=''>
                    {children}
                </RadixSelect.ItemText>
                <div className='w-5 -translate-x-1 flex items-center justify-center'>
                    <RadixSelect.ItemIndicator className=''>
                        <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            stroke='currentColor'
                            strokeWidth='3'
                        >
                            {/* check mark */}
                            <path d='M5 13l4 4L19 7' />
                        </svg>
                    </RadixSelect.ItemIndicator>
                </div>
            </RadixSelect.Item>
        );
    }
);
Iq7Select.Item = SelectItem;

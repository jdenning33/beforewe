import { Iq7StandardProps } from './Iq7StandardProps';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export function Iq7Dropdown({ children, className }: Iq7StandardProps) {
    return (
        <Dropdown.Root
        // className={
        //   "dropdown " +
        //   (alignDropdown == "right" ? "dropdown-end " : "") +
        //   className
        // }
        >
            {children}
        </Dropdown.Root>
    );
}

Iq7Dropdown.Trigger = function Iq7DropdownTrigger({
    children,
    className,
}: Iq7StandardProps) {
    return (
        <Dropdown.Trigger className={'' + className}>
            {children}
        </Dropdown.Trigger>
    );
};

Iq7Dropdown.Content = function Iq7DropDownContent({
    children,
    className,
    align,
}: { align?: 'start' | 'end' | 'center' } & Iq7StandardProps) {
    return (
        <Dropdown.Portal>
            <Dropdown.Content
                onCloseAutoFocus={(e) => e.preventDefault()}
                align={align}
                tabIndex={0}
                className={
                    'z-[1] p-2 shadow rounded-box bg-base-200 ' + className
                }
            >
                {children}
            </Dropdown.Content>
        </Dropdown.Portal>
    );
};

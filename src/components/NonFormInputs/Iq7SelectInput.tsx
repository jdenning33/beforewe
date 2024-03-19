import { ReactNode } from 'react';
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
        <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className={`whitespace-nowrap
                ${inputClasses} 
                ${sneaky ? sneakyInputClasses : ''} 
                ${groupSneaky ? groupSneakyInputClasses : ''} 
                ${className}
            `}
        >
            {children}
        </select>
    );
}
const SimpleSelectItem = ({
    value,
    children,
    className,
    ...props
}: {
    value: string;
    children: ReactNode;
    className?: string;
}) => {
    return (
        <option className='text-sm' value={value}>
            {children}
        </option>
    );
};
Iq7Select.Item = SimpleSelectItem;

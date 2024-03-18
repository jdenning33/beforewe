import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';
import {
    groupSneakyInputClasses,
    inputClasses,
    sneakyInputClasses,
} from './inputStyles';

type Props2 = {
    value: string | undefined;
    onValueChange: (value: string) => any;
    sneaky?: boolean;
    groupSneaky?: boolean;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
>;
export function Iq7TextInput({
    value,
    onValueChange,
    sneaky = false,
    groupSneaky = false,
    ...props
}: Props2) {
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    return (
        <input
            {...props}
            className={`${inputClasses} ${sneaky ? sneakyInputClasses : ''} ${
                groupSneaky ? groupSneakyInputClasses : ''
            } ${props.className}`}
            type='text'
            size={props.size || Math.max((currentValue?.length || 0) - 3, 5)}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.currentTarget.value)}
            onBlur={(e) => {
                value != currentValue && onValueChange(currentValue || '');
                props.onBlur && props.onBlur(e);
            }}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.currentTarget.blur();
                }
            }}
        />
    );
}

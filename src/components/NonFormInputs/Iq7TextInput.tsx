import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';

type Props2 = {
    value: string | undefined;
    onValueChange: (value: string) => any;
    sneaky?: boolean;
    groupSneaky?: boolean;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
>;
export default function Iq7TextInput({
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
            className={`p-1 truncate w-full ${
                sneaky ? 'bg-[unset] hover:bg-white' : ''
            } ${groupSneaky ? 'bg-[unset] group-hover:bg-white' : ''} ${
                props.className
            }`}
            type='text'
            size={currentValue?.length}
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

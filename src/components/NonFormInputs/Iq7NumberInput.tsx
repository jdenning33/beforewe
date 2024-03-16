import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';

type Props2 = {
    value: number | undefined;
    onValueChange: (value?: number) => any;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
>;
export function Iq7NumberInput({ value, onValueChange, ...props }: Props2) {
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    return (
        <input
            {...props}
            type='number'
            value={currentValue || undefined}
            onChange={(e) => setCurrentValue(parseFloat(e.currentTarget.value))}
            onBlur={(e) => currentValue != value && onValueChange(currentValue)}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.currentTarget.blur();
                }
            }}
            autoFocus
        />
    );
}

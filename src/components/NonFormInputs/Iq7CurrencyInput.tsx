import { useEffect, useState } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

type Props2 = {
    value: number | undefined;
    onValueChange: (value: number) => any;
    sneaky?: boolean;
    groupSneaky?: boolean;
} & Omit<CurrencyInputProps, 'value' | 'onValueChange'>;
export default function Iq7CurrencyInput({
    value,
    onValueChange,
    sneaky = false,
    groupSneaky = false,
    ...props
}: Props2) {
    const [currentValue, setCurrentValue] = useState(value ? value + '' : '');
    useEffect(() => {
        setCurrentValue(value ? value + '' : '');
    }, [value]);

    return (
        <CurrencyInput
            {...props}
            className={`p-1 truncate w-full ${
                sneaky ? 'bg-[unset] hover:bg-white' : ''
            } ${groupSneaky ? 'bg-[unset] group-hover:bg-white' : ''} ${
                props.className
            }`}
            value={currentValue}
            prefix={props.prefix || '$'}
            decimalScale={
                props.decimalScale != undefined ? props.decimalScale : 2
            }
            decimalsLimit={
                props.decimalsLimit != undefined ? props.decimalsLimit : 2
            }
            placeholder={props.placeholder || ''}
            onValueChange={(v) => {
                setCurrentValue(v || '');
            }}
            onBlur={(e) => {
                var floatValue = parseFloat(currentValue) || 0;
                floatValue != undefined &&
                    floatValue != value &&
                    onValueChange(floatValue);
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

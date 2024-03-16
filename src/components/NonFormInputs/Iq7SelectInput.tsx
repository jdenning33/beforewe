import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    SelectHTMLAttributes,
} from 'react';

type Props2<T> = {
    value: string | undefined;
    options: { label: string; value: T }[];
    onValueChange: (value: string) => any;
} & DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>;
export default function Iq7SelectInput<T extends string | number>({
    value,
    onValueChange,
    options,
    ...props
}: Props2<T>) {
    // if (true) return <div>hey</div>;
    return (
        <select
            {...props}
            defaultValue={value}
            onBlur={(e) => onValueChange(e.currentTarget.value)}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.currentTarget.blur();
                }
            }}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

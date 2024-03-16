import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props2<T> = {
    checked: boolean;
    onCheckedChange: (value: boolean) => any;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export default function Iq7CheckboxInput<T extends string | number>({
    checked,
    onCheckedChange,
    ...props
}: Props2<T>) {
    // if (true) return <div>hey</div>;
    return (
        <input
            {...props}
            className={'checkbox checkbox-primary ' + props.className}
            type='checkbox'
            checked={checked}
            onChange={(e) => onCheckedChange(e.currentTarget.checked)}
        />
    );
}

import moment from 'moment';
import { Moment } from 'moment';
import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';

type Props2 = {
    value: Moment | undefined | null;
    placeholder?: Moment;
    onValueChange: (value: Moment | null) => any;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value' | 'placeholder'
>;
export default function Iq7DateInput({
    value,
    placeholder,
    onValueChange,
    ...props
}: Props2) {
    const [currentValue, setCurrentValue] = useState(
        moment(value).format('YYYY-MM-DD')
    );
    useEffect(() => {
        setCurrentValue(moment(value).format('YYYY-MM-DD'));
    }, [value]);

    return (
        <input
            {...props}
            className={
                (!currentValue ? 'text-opacity-60 ' : '') + props.className
            }
            type='date'
            value={currentValue ?? placeholder?.format('YYYY-MM-DD')}
            onChange={(e) => {
                if (props.required && !e.currentTarget.value) {
                    setCurrentValue(moment(value).format('YYYY-MM-DD'));
                    return;
                }
                setCurrentValue(e.currentTarget.value);
            }}
            onBlur={(e) => {
                onValueChange(currentValue ? moment(currentValue) : null);
            }}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.currentTarget.blur();
                }
            }}
        />
    );
}

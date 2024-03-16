import {
    DetailedHTMLProps,
    HTMLAttributes,
    useEffect,
    useRef,
    useState,
} from 'react';

type Props = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & { value: string | undefined; onValueChange: (value: string) => any };

export function Iq7TextDiv({ value, onValueChange, ...props }: Props) {
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.currentTarget.innerText !== value)
            onValueChange(e.currentTarget.innerText);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    return (
        <div
            {...props}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={'cursor-text ' + props.className}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        >
            {value}
            {/* {!value && props.placeholder && (
                <div className='text-gray-400 pointer-events-none'>
                    {props.placeholder}
                </div>
            )} */}
        </div>
    );
}

type Props2 = DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & { value: string | undefined; onValueChange: (value: string) => any };

export function Iq7TextArea({ value, onValueChange, ...props }: Props2) {
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    return (
        <textarea
            {...props}
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

import {
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form';

export function Iq7FormInput<T extends FieldValues>({
    label,
    type,
    placeholder,
    className,
    inputClassName,
    onInputFocus,
    ...props
}: {
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    onInputFocus?: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onInputBlur?: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
} & UseControllerProps<T>) {
    const { field, fieldState } = useController(props);
    let newfield = {
        ...field,
        onBlur: (
            e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            if (type === 'date' && !e.target.value) {
                (e.target as any).type = 'text';
            }
            field.onBlur();
        },
    };
    if (!field.value) field.value = '' as any;

    return (
        <div
            className={`flex flex-col relative group ${
                type === 'date' ? 'w-36 ' : ''
            } ${className}`}
        >
            {label && <label htmlFor={field.name}>{label}</label>}
            <input
                type={type === 'date' && placeholder ? 'text' : type}
                onFocus={(e) => {
                    if (type === 'date' && placeholder) e.target.type = 'date';
                }}
                className={
                    'input input-sm ' +
                    (fieldState.invalid ? 'input-warning ' : '') +
                    inputClassName
                }
                {...newfield}
                placeholder={placeholder}
            />
            {fieldState.error?.message && (
                <p
                    className='text-sm font-medium absolute -bottom-2 left-0 max-w-[100%] 
                overflow-hidden translate-y-[100%] hidden 
                group-focus-within:block z-[4] 
                bg-warning text-warning-content p-1 rounded'
                >
                    {fieldState.error.message}
                </p>
            )}
        </div>
    );
}

import {
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form';

export function Iq7Input<T extends FieldValues>({
    label,
    type,
    placeholder,
    className,
    inputClassName,
    ...props
}: {
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
} & UseControllerProps<T>) {
    const { field, fieldState } = useController(props);

    if (!field.value) field.value = '' as any;

    return (
        <div className={`flex flex-col relative group ${className}`}>
            {label && <label htmlFor={field.name}>{label}</label>}
            <input
                type={type}
                className={
                    'input input-sm ' +
                    (fieldState.invalid ? 'input-warning ' : '') +
                    inputClassName
                }
                {...field}
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

export function Iq7Select<T extends FieldValues>({
    children,
    label,
    className,
    inputClassName,
    ...props
}: {
    children: React.ReactNode;
    label?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
} & UseControllerProps<T>) {
    const { field, fieldState } = useController(props);

    return (
        <div className={`flex flex-col relative group ${className}`}>
            {label && <label htmlFor={field.name}>{label}</label>}
            <select
                className={
                    'input input-sm ' +
                    (fieldState.invalid ? 'input-warning ' : '') +
                    inputClassName
                }
                {...field}
            >
                {children}
            </select>
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
Iq7Select.Option = function Iq7SelectOption({
    children,
    ...props
}: {
    children: React.ReactNode;
    value: string;
}) {
    return <option {...props}>{children}</option>;
};

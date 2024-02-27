export function Iq7Button({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'btn btn-sm ' + className} {...props}>
            {children}
        </button>
    );
}

export function Iq7PrimaryButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'btn btn-sm btn-primary ' + className} {...props}>
            {children}
        </button>
    );
}

export function Iq7AccentButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'btn btn-sm btn-accent ' + className} {...props}>
            {children}
        </button>
    );
}

export function Iq7PrimaryButtonDiv({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'btn btn-sm btn-primary ' + className} {...props}>
            {children}
        </div>
    );
}

export function Iq7OutlineButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'btn btn-sm btn-outline ' + className} {...props}>
            {children}
        </button>
    );
}

export function Iq7GhostButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'btn btn-sm btn-ghost ' + className} {...props}>
            {children}
        </button>
    );
}

export function Iq7IconButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={'btn btn-sm btn-ghost btn-circle ' + className}
            {...props}
        >
            {children}
        </button>
    );
}

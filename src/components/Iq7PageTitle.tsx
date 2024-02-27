export function Iq7PageTitle({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1 className={`text-3xl font-bold mb-4 ${className}`}>{children}</h1>
    );
}

export function Iq7PageSubTitle({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

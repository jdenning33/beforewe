export function Iq7Table({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <table className={`table ${className}`}>{children}</table>;
}
Iq7Table.HeadRow = function Iq7TableTHead({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <thead>
            <tr className={`sticky top-0 bg-base-100 ${className}`}>
                {children}
            </tr>
        </thead>
    );
};
Iq7Table.Body = function Iq7TableTBody({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <tbody className={`${className}`}>{children}</tbody>;
};
Iq7Table.Row = function Iq7TableTRow({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}) {
    return (
        <tr className={className} onClick={onClick}>
            {children}
        </tr>
    );
};

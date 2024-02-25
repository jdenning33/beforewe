import { Iq7StandardProps } from './Iq7StandardProps';

export function Iq7Card({ children, className }: Iq7StandardProps) {
    return (
        <div
            className={
                'card bg-base-200 text-base-content border border-base-300 ' +
                className
            }
        >
            {children}
        </div>
    );
}

Iq7Card.Body = function Iq7CardBody({ children, className }: Iq7StandardProps) {
    return <div className={'card-body p-4 ' + className}>{children}</div>;
};

Iq7Card.Title = function Iq7CardTitle({
    children,
    className,
}: Iq7StandardProps) {
    return <div className={'card-title p-4 pb-0 ' + className}>{children}</div>;
};

Iq7Card.Subsection = function Iq7CardSubsection({
    children,
    className,
}: Iq7StandardProps) {
    return (
        <div className={'border border-base-content rounded p-3 ' + className}>
            {children}
        </div>
    );
};

Iq7Card.SubsectionTitle = function Iq7CardSubsectionTitle({
    children,
    className,
}: Iq7StandardProps) {
    return <h3 className={'text-sm font-bold ' + className}>{children}</h3>;
};

import { useState } from 'react';
import { Iq7GhostButton } from './Iq7Button';
import React from 'react';

export function Iq7Table({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <table className={`table ${className}`}>{children}</table>;
}
Iq7Table.Head = function Iq7TableTHead({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <thead className={className}>{children}</thead>;
};

Iq7Table.HeadRow = function Iq7TableTHeadRow({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <tr className={`sticky top-0 bg-base-100 shadow z-10 ${className}`}>
            {children}
        </tr>
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

type Iq7TableTRowProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
};
Iq7Table.Row = function Iq7TableTRow({
    children,
    className,
    onClick,
    ...props
}: Iq7TableTRowProps) {
    return (
        <tr
            className={`hover:bg-base-200 focus-within:bg-base-200 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </tr>
    );
};

Iq7Table.SummaryRow = function Iq7TableTSummaryRow(props: Iq7TableTRowProps) {
    return (
        <Iq7Table.Row
            {...props}
            className={`bg-accent text-accent-content hover:bg-accent hover:text-accent-content ${props.className}`}
        />
    );
};

const ExpandingRowContext = React.createContext<
    | {
          expanded: boolean;
          setExpanded: (v: boolean) => void;
      }
    | undefined
>(undefined);

Iq7Table.ExpandingRow = function Iq7TableTExpandingRow({
    expandedContent,
    defaultExpanded = true,
    ...props
}: {
    expandedContent: React.ReactNode;
    defaultExpanded?: boolean;
} & Iq7TableTRowProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    return (
        <>
            <ExpandingRowContext.Provider value={{ expanded, setExpanded }}>
                <Iq7Table.Row
                    {...props}
                    className={`hover:bg-base-300 bg-base-300 my-0 ${props.className}`}
                    data-expanded={expanded}
                >
                    {props.children}
                </Iq7Table.Row>
                {expanded && expandedContent}
            </ExpandingRowContext.Provider>
        </>
    );
};

Iq7Table.ExpandingRowTrigger = function Iq7TableTExpandingRowTrigger() {
    return (
        <ExpandingRowContext.Consumer>
            {(context) => {
                if (!context) {
                    throw new Error(
                        'ExpandingRowTrigger must be a child of ExpandingRow'
                    );
                }
                return (
                    <button
                        className={
                            'btn btn-ghost btn-circle btn-xs data-[expanded=true]:rotate-90'
                        }
                        data-expanded={context.expanded}
                        onClick={(e) => context.setExpanded(!context.expanded)}
                    >
                        {`>`}
                    </button>
                );
            }}
        </ExpandingRowContext.Consumer>
    );
};

export function Iq7MenuLink({
    children,
    isActive,
    title,
    onClick,
    className,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    title?: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
}) {
    return (
        <li
            title={title}
            onClick={(e) => {
                onClick && onClick(e);
            }}
            className={'truncate '}
        >
            <div
                className={
                    'px-2 py-1 rounded w-full text-left cursor-pointer ' +
                    (isActive
                        ? 'bg-base-300 border font-medium hover:bg-base-300 '
                        : 'hover:bg-base-300 ') +
                    className
                }
            >
                {children}
            </div>
        </li>
    );
}

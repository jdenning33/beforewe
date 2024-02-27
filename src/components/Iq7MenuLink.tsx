import Link from 'next/link';

export function Iq7MenuLink({
    children,
    isActive,
    title,
    onClick,
    href,
    className,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    title?: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
}) {
    const baseClassName =
        'px-2 py-1 rounded w-full text-left cursor-pointer hover:bg-base-300 w-full ';
    const activeClassName = 'bg-base-300 border font-medium ';
    return (
        <li
            title={title}
            onClick={(e) => {
                onClick && onClick(e);
            }}
            className={'truncate '}
        >
            <div
                className={`${baseClassName} ${
                    isActive ? activeClassName : ''
                } ${className}`}
            >
                {href ? (
                    <Link className='w-full block' href={href}>
                        {children}
                    </Link>
                ) : (
                    <>{children}</>
                )}
            </div>
        </li>
    );
}

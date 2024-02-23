import { Iq7StandardProps } from './Iq7StandardProps';

export function Iq7Navbar({ className, children }: Iq7StandardProps) {
    return (
        <div
            className={
                'navbar bg-base-100 bg-opacity-90 py-[1px] min-h-[unset] ' +
                className
            }
        >
            {children}
        </div>
    );
}

Iq7Navbar.LeftOptions = function Iq7NavbarLeftOptions({
    children,
    className,
}: Iq7StandardProps) {
    return <div className={'navbar-start ' + className}>{children}</div>;
};

Iq7Navbar.Title = function Iq7NavBarTitle({
    children,
    className,
}: Iq7StandardProps) {
    return (
        <div className={'navbar-center font-medium text-lg ' + className}>
            {children}
        </div>
    );
};

Iq7Navbar.RightOptions = function Iq7NavbarRightOptions({
    children,
    className,
}: Iq7StandardProps) {
    return <div className={'navbar-end ' + className}>{children}</div>;
};

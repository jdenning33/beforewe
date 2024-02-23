import { Iq7StandardProps } from './Iq7StandardProps';

export function Iq7ButtonDiv({ children, className }: Iq7StandardProps) {
    return <div className={'btn btn-ghost ' + className}>{children}</div>;
}

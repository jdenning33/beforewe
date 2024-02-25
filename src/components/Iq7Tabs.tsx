import * as Tabs from '@radix-ui/react-tabs';
import { Iq7StandardProps } from './Iq7StandardProps';

export function Iq7Tabs({
    children,
    className,
    defaultValue,
}: { defaultValue: string } & Iq7StandardProps) {
    return (
        <Tabs.Root defaultValue={defaultValue} className={className}>
            {children}
        </Tabs.Root>
    );
}

Iq7Tabs.List = function Iq7TabsList({ children, className }: Iq7StandardProps) {
    return <Tabs.List className='flex tabs tabs-lifted'>{children}</Tabs.List>;
};

Iq7Tabs.Trigger = function Iq7TabsTrigger({
    children,
    className,
    value,
}: { value: string } & Iq7StandardProps) {
    return (
        <Tabs.Trigger
            value={value}
            className='tab data-[state=active]:tab-active whitespace-nowrap'
        >
            {children}
        </Tabs.Trigger>
    );
};

Iq7Tabs.Content = function Iq7TabsContent({
    children,
    className,
    value,
}: { value: string } & Iq7StandardProps) {
    return (
        <Tabs.Content
            value={value}
            className='tab-content data-[state=active]:block bg-base-100 border-base-300 rounded-b-lg p-2'
        >
            {children}
        </Tabs.Content>
    );
};

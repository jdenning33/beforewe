import { useEvents } from '../event-details/hooks/useEvents';
import { useEvent, useUrlMatchingEvent } from '../event-details/hooks/useEvent';
import { Iq7MenuLink } from '../../components/Iq7MenuLink';
import { useAuthUser } from '../user/hooks/useAuthUser';
import Link from 'next/link';
import { Iq7Dropdown } from '@/src/components/Iq7Dropdown';
import { Iq7IconButtonDiv } from '@/src/components/Iq7IconButtonDiv';
import { Iq7Tabs } from '@/src/components/Iq7Tabs';
import { MenuBarsIcon } from '@/src/components/icons/MenuBarsIcon';
import { Iq7Button, Iq7PrimaryButton } from '@/src/components/Iq7Button';
import { Suspense } from 'react';
import { Iq7LoadingView } from '@/src/components/Iq7LoadingView';

export function NavigationMenu() {
    let { isSignedIn } = useAuthUser();
    return (
        <Iq7Dropdown>
            <Iq7Dropdown.Trigger>
                <Iq7IconButtonDiv>
                    <MenuBarsIcon />
                </Iq7IconButtonDiv>
            </Iq7Dropdown.Trigger>
            <Iq7Dropdown.Content align='start'>
                <Suspense fallback={<Iq7LoadingView />}>
                    <Iq7Tabs defaultValue='tools'>
                        <Iq7Tabs.List>
                            <Iq7Tabs.Trigger value='tools'>
                                Tools
                            </Iq7Tabs.Trigger>
                            <Iq7Tabs.Trigger value='tiles'>
                                Tiles
                            </Iq7Tabs.Trigger>
                            {isSignedIn && (
                                <Iq7Tabs.Trigger value='event'>
                                    Switch Events
                                </Iq7Tabs.Trigger>
                            )}
                        </Iq7Tabs.List>
                        <Iq7Tabs.Content value='tools'>
                            <ToolSelector />
                        </Iq7Tabs.Content>
                        <Iq7Tabs.Content value='tiles'>
                            <TileSelector />
                        </Iq7Tabs.Content>
                        <Iq7Tabs.Content value='event'>
                            <EventsSelector />
                        </Iq7Tabs.Content>
                    </Iq7Tabs>
                </Suspense>
            </Iq7Dropdown.Content>
        </Iq7Dropdown>
    );
}
function ToolSelector() {
    const { matchingEvent } = useUrlMatchingEvent();

    return (
        <ul>
            <Iq7MenuLink
                title='Homepage'
                href={`/${matchingEvent?.alias || 'landing'}`}
            >
                Homepage
            </Iq7MenuLink>
            <Iq7MenuLink
                title='Budget'
                href={`/${matchingEvent?.alias || 'landing'}/budget`}
            >
                Budget
            </Iq7MenuLink>
            <Iq7MenuLink title='Timeline'>Timeline</Iq7MenuLink>
        </ul>
    );
}

function TileSelector() {
    return (
        <ul>
            <Iq7MenuLink onClick={(_) => {}}>Venue</Iq7MenuLink>
            <Iq7MenuLink onClick={(_) => {}}>Photographer</Iq7MenuLink>
            <Iq7MenuLink onClick={(_) => {}}>Guest List</Iq7MenuLink>
        </ul>
    );
}

function EventsSelector() {
    const { events } = useEvents();
    const { matchingEvent } = useUrlMatchingEvent();
    return (
        <ul>
            {events.map((event) => {
                return (
                    <Iq7MenuLink
                        key={event.id}
                        className='w-full'
                        href={`/${event.alias}`}
                        title={event.name}
                        isActive={event.id === matchingEvent?.id}
                    >
                        {event.name}
                    </Iq7MenuLink>
                );
            })}
            <div className='divider my-2'></div>
            <div className='w-full flex justify-center pb-2'>
                <Iq7PrimaryButton>
                    <Link className='' href={`/new`}>
                        New Event
                    </Link>
                </Iq7PrimaryButton>
            </div>
        </ul>
    );
}

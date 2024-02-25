import { useEvents } from '../event-details/hooks/useEvents';
import { useEvent, useUrlMatchingEvent } from '../event-details/hooks/useEvent';
import { Iq7MenuLink } from '../../components/Iq7MenuLink';
import { useAuthUser } from '../user/hooks/useAuthUser';
import Link from 'next/link';
import { Iq7Dropdown } from '@/src/components/Iq7Dropdown';
import { Iq7IconButtonDiv } from '@/src/components/Iq7IconButtonDiv';
import { Iq7Tabs } from '@/src/components/Iq7Tabs';
import { MenuBarsIcon } from '@/src/components/icons/MenuBarsIcon';

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
                <Iq7Tabs defaultValue='tools'>
                    <Iq7Tabs.List>
                        <Iq7Tabs.Trigger value='tools'>Tools</Iq7Tabs.Trigger>
                        <Iq7Tabs.Trigger value='tiles'>Tiles</Iq7Tabs.Trigger>
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
            </Iq7Dropdown.Content>
        </Iq7Dropdown>
    );
}
function ToolSelector() {
    return (
        <ul>
            <Iq7MenuLink title='Homepage'>Homepage</Iq7MenuLink>
            <Iq7MenuLink title='Budget'>Budget</Iq7MenuLink>
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
                    <Link
                        key={event.id}
                        className='w-full'
                        href={`/${event.alias}`}
                    >
                        <Iq7MenuLink
                            title={event.name}
                            isActive={event.id === matchingEvent?.id}
                        >
                            {event.name}
                        </Iq7MenuLink>
                    </Link>
                );
            })}
            <div className='divider my-2'></div>
            <div className='w-full flex justify-center pb-2'>
                <Link className='btn btn-sm btn-secondary w-full' href={`/new`}>
                    New Event
                </Link>
            </div>
        </ul>
    );
}

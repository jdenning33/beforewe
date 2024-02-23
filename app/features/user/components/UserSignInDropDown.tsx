import { Iq7ButtonDiv } from '@/app/components/Iq7ButtonDiv';
import { Iq7Dropdown } from '@/app/components/Iq7Dropdown';
import UserAuthPanel from './UserAuthPanel';

export function UserSignInDropDown() {
    return (
        <Iq7Dropdown>
            <Iq7Dropdown.Trigger>
                <Iq7ButtonDiv>Sign in</Iq7ButtonDiv>
            </Iq7Dropdown.Trigger>
            <Iq7Dropdown.Content align='end'>
                <UserAuthPanel />
            </Iq7Dropdown.Content>
        </Iq7Dropdown>
    );
}

import { Iq7ButtonDiv } from '@/src/components/Iq7ButtonDiv';
import { Iq7Dropdown } from '@/src/components/Iq7Dropdown';
import UserAuthPanel from './UserAuthPanel';

export function UserSignInDropDown() {
    return (
        <Iq7Dropdown>
            <Iq7Dropdown.Trigger>
                <Iq7ButtonDiv>Sign in</Iq7ButtonDiv>
            </Iq7Dropdown.Trigger>
            <Iq7Dropdown.Content className='bg-white border p-4' align='end'>
                <UserAuthPanel />
            </Iq7Dropdown.Content>
        </Iq7Dropdown>
    );
}

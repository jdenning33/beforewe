import { Iq7Dropdown } from '@/src/components/Iq7Dropdown';
import { useAuthUser } from '../hooks/useAuthUser';
import Image from 'next/image';
import { Iq7MenuLink } from '@/src/components/Iq7MenuLink';

export function UserOptionsDropDown() {
    const { signedInUser, signOut } = useAuthUser();
    return (
        <Iq7Dropdown>
            <Iq7Dropdown.Trigger>
                <div className='btn btn-ghost btn-circle avatar'>
                    <div
                        className='w-9 rounded-full'
                        title={signedInUser?.full_name ?? signedInUser?.email}
                    >
                        {signedInUser?.avatar_url ? (
                            <Image
                                width={50}
                                height={50}
                                src={signedInUser?.avatar_url}
                                alt='Avatar'
                            />
                        ) : (
                            <div className='w-9 h-9 bg-neutral rounded-full flex justify-center items-center'>
                                {signedInUser?.full_name?.charAt(0) ??
                                    signedInUser?.email
                                        ?.charAt(0)
                                        .toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </Iq7Dropdown.Trigger>
            <Iq7Dropdown.Content className='z-[105]' align='end'>
                <ul>
                    <Iq7MenuLink onClick={signOut}>Sign Out</Iq7MenuLink>
                </ul>
            </Iq7Dropdown.Content>
        </Iq7Dropdown>
    );
}

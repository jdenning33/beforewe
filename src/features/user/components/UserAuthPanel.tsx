import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UserAuthPanel({
    view,
}: {
    view?:
        | 'sign_in'
        | 'sign_up'
        | 'forgotten_password'
        | 'update_password'
        | 'magic_link';
}) {
    const supabase = createClientComponentClient();
    return (
        <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{ theme: ThemeSupa }}
            theme='dark'
            showLinks={false}
            providers={['google', 'facebook']}
            socialLayout='horizontal'
        />
    );
}

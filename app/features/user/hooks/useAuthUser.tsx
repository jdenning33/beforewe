import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthSession } from '@supabase/supabase-js';
import { Moment } from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';

type IUser = {
    id: string;
    email?: string;
    avatar_url?: string;
    full_name?: string;
};

type AuthUserType = {
    isAuthInitialized: boolean;
    isSignedIn: boolean;
    signedInUser: IUser | null;
    signOut: () => void;
};

export const AuthUserContext = createContext<AuthUserType | null>(null);

export function AuthUserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClientComponentClient();
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state change', event, session);
            setIsAuthInitialized(true);
            setSession(session);
        });
        return () => data.subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        window.location.reload();
        if (error) {
            console.error('Error signing out:', error);
            return;
        }
    };

    let signedInUser: IUser | null = session
        ? {
              id: session.user.id,
              email: session.user.email,
              avatar_url: session.user.user_metadata.avatar_url,
              full_name: session.user.user_metadata.full_name,
          }
        : null;

    return (
        <AuthUserContext.Provider
            value={{
                isAuthInitialized,
                isSignedIn: session ? true : false,
                signedInUser,
                signOut,
            }}
        >
            {children}
        </AuthUserContext.Provider>
    );
}

export function useAuthUser() {
    const context = useContext(AuthUserContext);
    if (!context) {
        throw new Error(
            'useAuthUser must be used within a AuthUserContextProvider'
        );
    }
    return context;
}

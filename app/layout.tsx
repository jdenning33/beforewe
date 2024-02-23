"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Iq7Navbar } from "./components/Iq7Navbar";
import { NavigationMenu } from "./features/navigation-menu/NavigationMenu";
import { Notifications } from "./components/icons/Notifications";
import { UserOptionsDropDown } from "./features/user/components/UserOptionsDropDown";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Iq7ErrorView } from "./components/Iq7ErrorView";
import { Iq7LoadingView } from "./components/Iq7LoadingView";
import { EventProvider } from "./features/event-details/hooks/useEvent";
import {
  AuthUserContextProvider,
  useAuthUser,
} from "./features/user/hooks/useAuthUser";
import { UserSignInDropDown } from "./features/user/components/UserSignInDropDown";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    } as any,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BeforeWe.co</title>
        <meta
          name="description"
          content={"A better wedding planning experience."}
        />
      </head>
      <body>
        <div className={`flex flex-col min-h-screen bg-base-100`}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback="Loading...">
              <AuthUserContextProvider>
                <EventProvider>
                  <Content>{children}</Content>
                </EventProvider>
              </AuthUserContextProvider>
            </Suspense>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { isAuthInitialized } = useAuthUser();

  return isAuthInitialized ? (
    <>
      <Iq7Navbar className="sticky top-0 z-[2]">
        <Iq7Navbar.LeftOptions>
          <NavigationMenu />
        </Iq7Navbar.LeftOptions>
        <Iq7Navbar.Title>BeforeWe.co</Iq7Navbar.Title>
        <Iq7Navbar.RightOptions>
          <Notifications />
          <AuthOptions />
        </Iq7Navbar.RightOptions>
      </Iq7Navbar>
      <main className="p-4">
        <ErrorBoundary FallbackComponent={Iq7ErrorView}>
          <Suspense fallback={<Iq7LoadingView />}>{children}</Suspense>
        </ErrorBoundary>
      </main>
    </>
  ) : (
    <Iq7LoadingView />
  );
}

function AuthOptions() {
  const { isSignedIn } = useAuthUser();
  return isSignedIn ? <UserOptionsDropDown /> : <UserSignInDropDown />;
}

import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";

export const HomeView = () => {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/dashboard" />
      </SignedOut>
    </>
  );
};

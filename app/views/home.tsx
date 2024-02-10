import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Bookshelf } from "../components /bookshelf";
import { trpc } from "../lib/trpc";

const Authed = () => {
  const [user] = trpc.me.useSuspenseQuery();
  return JSON.stringify(user);
};

export const HomeView = () => {
  const [data] = trpc.test.useSuspenseQuery();

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
      <SignedIn>
        <SignOutButton />
        <Authed />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Bookshelf />
    </div>
  );
};

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Bookshelf } from "../components /bookshelf";
import { BookScanner } from "../components /bookScanner";
import { trpc } from "../lib/trpc";

const Authed = () => {
  const [user] = trpc.me.useSuspenseQuery();
  return JSON.stringify(user);
};

export const HomeView = () => {
  return (
    <div className="text-amber-950">
      <SignedIn>
        <SignOutButton />
        <Authed />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div className="p-2 m-auto md:w-[80%] lg:w-[50%]">
        <BookScanner />
        <Bookshelf />
      </div>
    </div>
  );
};

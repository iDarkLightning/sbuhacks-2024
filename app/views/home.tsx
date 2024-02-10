import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BookScanner } from "../components /bookScanner";
import { Bookshelf } from "../components /bookshelf";

export const HomeView = () => {
  return (
    <div>
      <SignedIn>
        <SignOutButton />
        <div className="p-2 m-auto md:w-[80%] lg:w-[50%]">
          <BookScanner />
          <Bookshelf />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BookScanner } from "../components /bookScanner";
import { Bookshelf } from "../components /bookshelf";
import { FaSignOutAlt } from "react-icons/fa";

export const HomeView = () => {
  return (
    <div>
      <SignedIn>
        <div className="flex flex-row p-2">
          <div className="grow" />
          <SignOutButton>
            <span className="hover:cursor-pointer flex flex-row items-center gap-1 transition-colors bg-teal-950 hover:bg-red-800 text-amber-50 p-1 rounded-md w-fit">
              <p>Sign Out</p>
              <FaSignOutAlt />
            </span>
          </SignOutButton>
        </div>
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

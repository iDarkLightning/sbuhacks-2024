import {
  RedirectToSignIn,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BookScanner } from "../components /bookScanner";
import { Bookshelf } from "../components /bookshelf";
import { trpc } from "../lib/trpc";
import { GetRecs } from "../components /getRecs";

const Authed = () => {
  const [isbn, setIsbn] = useState("");
  const scan = trpc.book.scan.useMutation();

  return (
    <>
      <input
        type="text"
        value={isbn}
        onChange={(evt) => setIsbn(evt.target.value)}
      />
      <button onClick={() => scan.mutate({ isbn })}>Add Book</button>
    </>
  );
};

const Shelves = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();

  return <Bookshelf shelves={shelves} />;
};

export const DashboardView = () => {
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
          <Authed />
        </div>
        <div className="p-2 m-auto md:w-[80%] lg:w-[50%]">
          <BookScanner />
          <Shelves />
        </div>
        <GetRecs />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

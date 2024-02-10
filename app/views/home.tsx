import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Bookshelf } from "../components /bookshelf";
import { BookScanner } from "../components /bookScanner";
import { trpc } from "../lib/trpc";
import { useState } from "react";

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

export const HomeView = () => {
  return (
    <div className="text-amber-950">
      <SignedIn>
        <SignOutButton />
        <Authed />
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

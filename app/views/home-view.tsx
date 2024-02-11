import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";
import { cn } from "../lib/utils";
import { Button } from "../components /ui/button";

export const HomeView = () => {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <SignedOut>
        <div
          className={cn(
            "max-w-[100rem] py-6 px-4 md:mx-auto md:w-[80%] lg:w-[85%] 2xl:w-[90%] h-screen"
          )}
        >
          <div className="flex items-center flex-col text-center gap-4 h-full justify-center border-2 border-stone-800 rounded-md bg-amber-100/30">
            <h1 className="text-3xl md:text-5xl font-bold text-balance tracking-tight max-w-3xl">
              BetterReads is a new way to manage your reading
            </h1>
            <p className="max-w-2xl text-balance">
              BetterReads is a simple app to help you keep track of your books.
              You can scan the barcode of your books to add them to your shelf
              and write reviews for them.
            </p>
            <Button
              asChild
              className="bg-amber-300 text-stone-800 transition-colors hover:bg-amber-400/50 border-amber-500"
            >
              <SignInButton />
            </Button>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

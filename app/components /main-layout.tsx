import {
  RedirectToSignIn,
  SignOutButton,
  SignedIn,
  useAuth,
} from "@clerk/clerk-react";
import { Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { FaSignOutAlt } from "react-icons/fa";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const MainLayout = () => {
  const childMatches = useChildMatches();
  const auth = useAuth();

  const requiresAuth = childMatches.some(
    (match) => match.staticData.requiresAuth
  );

  if (requiresAuth && !auth.userId) return <RedirectToSignIn />;

  return (
    <div
      className={cn(
        "max-w-[100rem] py-6 px-4 md:mx-auto md:w-[80%] lg:w-[85%] 2xl:w-[90%] h-[100dvh]"
      )}
    >
      <div className="flex flex-col gap-4 h-full border-2 border-stone-800 rounded-md bg-amber-50/30">
        <div className="bg-amber-100/80 rounded-md px-4 lg:px-12 flex justify-between items-center py-4">
          <Link to="/dashboard">
            <h1 className="text-stone-950 font-semibold text-xl">
              BetterReads
            </h1>
          </Link>
          <SignedIn>
            <Button
              className="bg-indigo-800 text-stone-50 transition-colors hover:bg-indigo-700 border-indigo-900 w-max"
              asChild
            >
              <SignOutButton>
                <span className="flex gap-4 w-full">
                  <p className="mr-4">Sign Out</p>
                  <FaSignOutAlt />
                </span>
              </SignOutButton>
            </Button>
          </SignedIn>
        </div>
        <div className="p-2 mx-auto w-full md:w-[80%] lg:w-[50%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

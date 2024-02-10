import { getAuth } from "@hono/clerk-auth";
import { PrismaClient } from "@prisma/client";
import { Context, Env } from "hono";

export const createFetchContext = (context: Context<Env, "/api/*">) => () => {
  const auth = getAuth(context);
  const clerkClient = context.get("clerk");

  const prisma = new PrismaClient();

  return {
    auth,
    clerkClient,
    prisma,
  };
};

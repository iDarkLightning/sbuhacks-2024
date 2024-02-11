import { getAuth } from "@hono/clerk-auth";
import { PrismaClient } from "@prisma/client";
import { Context, Env } from "hono";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

export const createFetchContext = (context: Context<Env, "/api/*">) => () => {
  const auth = getAuth(context);
  const clerkClient = context.get("clerk");

  return {
    auth,
    clerkClient,
    prisma,
    openai,
  };
};

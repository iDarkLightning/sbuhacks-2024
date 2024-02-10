import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { apiRouter } from "./trpc/routes/__root";
import { createFetchContext } from "./trpc/context";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono();

app.use(
  "*",
  clerkMiddleware({
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use("/api/*", (context, next) => {
  return trpcServer({
    router: apiRouter,
    createContext: createFetchContext(context),
  })(context, next);
});

app.get("/ping", (ctx) => {
  return ctx.text("Hello, World!");
});

export default app;

import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { apiRouter } from "./trpc/routes/__root";

const app = new Hono();

app.get("/api/*", trpcServer({ router: apiRouter }));

app.get("/ping", (ctx) => {
  return ctx.text("Hello, World!");
});

export default app;

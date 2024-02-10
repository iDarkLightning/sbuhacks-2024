import { Hono } from "hono";

const app = new Hono();

app.get("/ping", (ctx) => {
  return ctx.text("Hello, World!");
});

export default app;

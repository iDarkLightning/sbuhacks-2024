import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { homeRoute } from "./routes/main";

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
  routeTree,
});

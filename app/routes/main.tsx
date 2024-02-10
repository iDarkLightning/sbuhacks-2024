import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { HomeView } from "../views/home";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: async ({ context }) => await context.queryUtils.test.ensureData(),
  component: HomeView,
});

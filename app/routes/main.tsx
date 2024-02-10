import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { HomeView } from "../views/home";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeView,
});

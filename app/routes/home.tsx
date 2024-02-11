import { createRoute } from "@tanstack/react-router";
import { HomeView } from "../views/home-view";
import { rootRoute } from "./__root";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeView,
});

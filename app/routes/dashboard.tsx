import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { DashboardView } from "../views/dashboard-view";

export const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
  component: DashboardView,
});

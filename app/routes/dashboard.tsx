import { createRoute } from "@tanstack/react-router";
import { DashboardView } from "../views/dashboard-view";
import { mainLayout } from "./_layout";

export const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => mainLayout,
  staticData: {
    requiresAuth: true,
  },
  component: DashboardView,
});

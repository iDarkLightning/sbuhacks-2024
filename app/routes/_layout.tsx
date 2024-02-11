import { createRoute } from "@tanstack/react-router";
import { MainLayout } from "../components /main-layout";
import { rootRoute } from "./__root";

export const mainLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: MainLayout,
});

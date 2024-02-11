import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { ShelfView } from "../views/shelf-view";

export const shelfRoute = createRoute({
  path: "/shelf/$userId",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context, params }) => {
    if (params.userId === context.authState?.userId) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: ShelfView,
});

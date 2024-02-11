import { createRoute, redirect } from "@tanstack/react-router";
import { ShelfView } from "../views/shelf-view";
import { mainLayout } from "./_layout";

export const shelfRoute = createRoute({
  path: "/shelf/$userId",
  getParentRoute: () => mainLayout,
  beforeLoad: ({ context, params }) => {
    if (params.userId === context.authState?.userId) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: ShelfView,
});

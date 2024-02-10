import { createRootRouteWithContext } from "@tanstack/react-router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { ApiRouter } from "../../server/trpc";

interface RouterContext {
  queryUtils: ReturnType<typeof createTRPCQueryUtils<ApiRouter>>;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  wrapInSuspense: true,
});

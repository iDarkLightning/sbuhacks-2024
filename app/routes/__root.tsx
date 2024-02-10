import { createRootRouteWithContext } from "@tanstack/react-router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { ApiRouter } from "../../server/trpc";
import { useAuth } from "@clerk/clerk-react";

interface RouterContext {
  queryUtils: ReturnType<typeof createTRPCQueryUtils<ApiRouter>>;
  authState: ReturnType<typeof useAuth>;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  wrapInSuspense: true,
});

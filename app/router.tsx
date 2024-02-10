import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as _createRouter } from "@tanstack/react-router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { type ApiRouter } from "../server/trpc";
import { trpc } from "./lib/trpc";
import { rootRoute } from "./routes/__root";
import { homeRoute } from "./routes/main";

interface CreateRouterOptions {
  trpcClient: ReturnType<typeof trpc.createClient>;
  queryClient: QueryClient;
}

const routeTree = rootRoute.addChildren([homeRoute]);

export const createRouter = ({
  trpcClient,
  queryClient,
}: CreateRouterOptions) =>
  _createRouter({
    routeTree,
    Wrap: ({ children }) => {
      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
    context: {
      queryUtils: createTRPCQueryUtils<ApiRouter>({
        client: trpcClient,
        queryClient,
      }),
      authState: undefined!,
    },
  });

import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { ApiRouter } from "../../server/trpc";
import type { GetToken } from "@clerk/types";

export const trpc = createTRPCReact<ApiRouter>();

export const createTrpcClient = (getToken: GetToken) =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api",
        async headers() {
          const token = await getToken();
          console.log(token);

          return {
            Authorization: token ? `Bearer ${token}` : "",
          };
        },
      }),
    ],
  });

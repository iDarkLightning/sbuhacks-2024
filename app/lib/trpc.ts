import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { ApiRouter } from "../../server/trpc";

export const trpc = createTRPCReact<ApiRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:5173/api",
    }),
  ],
});

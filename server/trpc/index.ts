import { TRPCError, inferRouterOutputs, initTRPC } from "@trpc/server";
import { createFetchContext } from "./context";
import { type ApiRouter } from "./routes/__root";

const t = initTRPC
  .context<ReturnType<ReturnType<typeof createFetchContext>>>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    if (!opts.ctx.auth?.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to do that",
      });
    }

    const user = await opts.ctx.clerkClient.users.getUser(opts.ctx.auth.userId);

    return opts.next({ ctx: { user } });
  })
);

export { ApiRouter };
export type RouterOutput = inferRouterOutputs<ApiRouter>;

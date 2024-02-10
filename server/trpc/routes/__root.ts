import { authedProcedure, publicProcedure, router } from "..";

export const apiRouter = router({
  me: authedProcedure.query(({ ctx }) => {
    return ctx.user.firstName;
  }),
});

export type ApiRouter = typeof apiRouter;

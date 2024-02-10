import { authedProcedure, publicProcedure, router } from "..";

export const apiRouter = router({
  test: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany();
  }),

  me: authedProcedure.query(({ ctx }) => {
    return ctx.user.firstName;
  }),
});

export type ApiRouter = typeof apiRouter;

import { authedProcedure, router } from "..";
import { bookRouter } from "./book-router";

export const apiRouter = router({
  book: bookRouter,

  me: authedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});

export type ApiRouter = typeof apiRouter;

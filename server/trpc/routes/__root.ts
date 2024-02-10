import { publicProcedure, router } from "..";

export const apiRouter = router({
  test: publicProcedure.query(() => "Hi there from the server!"),
});

export type ApiRouter = typeof apiRouter;

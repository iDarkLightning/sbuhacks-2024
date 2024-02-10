import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "..";

const prisma = new PrismaClient();

export const apiRouter = router({
  test: publicProcedure.query(() => {
    return prisma.test.findMany();
  }),
});

export type ApiRouter = typeof apiRouter;

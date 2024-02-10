import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const notNullish = <T>(x: T | null | undefined): x is T => !!x;

export const isPrismaNotFoundError = (
  e: unknown
): e is PrismaClientKnownRequestError => {
  return e instanceof PrismaClientKnownRequestError && e.code === "P2025";
};

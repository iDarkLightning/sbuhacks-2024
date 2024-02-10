import { authedProcedure, router } from "..";
import { z } from "zod";
import { isPrismaNotFoundError } from "../../lib/utils";
import { fetchBookFromIsbn } from "../../lib/api/books";

export const bookRouter = router({
  getAll: authedProcedure.input(z.object({})).query(async (opts) => {
    const books = opts.ctx.prisma.book.findMany({
      where: {},
    });
  }),
  scan: authedProcedure
    .input(
      z.object({
        isbn: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const book = await opts.ctx.prisma.book.update({
          where: { isbn: opts.input.isbn },
          data: {
            ownedBy: {
              push: opts.ctx.user.id,
            },
          },
        });

        return book;
      } catch (err) {
        if (isPrismaNotFoundError(err)) {
          const bookRes = await fetchBookFromIsbn(opts.input.isbn);

          return opts.ctx.prisma.book.create({
            data: {
              isbn: opts.input.isbn,
              title: bookRes.title,
              author: bookRes.author_name,
              subjects: bookRes.subject,
              ownedBy: {
                set: [opts.ctx.user.id],
              },
            },
          });
        }
      }
    }),
});

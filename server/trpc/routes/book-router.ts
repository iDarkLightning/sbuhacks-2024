import { authedProcedure, publicProcedure, router } from "..";
import { z } from "zod";
import { isPrismaNotFoundError } from "../../lib/utils";
import { fetchBookFromIsbn } from "../../lib/api/books";
import { type PrismaClient } from "@prisma/client";

const getShelvesForUser = async (prisma: PrismaClient, userId: string) => {
  const books = await prisma.book.findMany({
    where: {
      ownedBy: {
        has: userId,
      },
    },
  });

  const CHUNK_SIZE = 15;
  const chunks = [];

  for (let i = 0; i < books.length; i += CHUNK_SIZE) {
    chunks.push(books.slice(i, i + CHUNK_SIZE));
  }

  return chunks;
};

export const bookRouter = router({
  review: {
    getAll: publicProcedure
      .input(z.object({ isbn: z.string() }))
      .query(async (opts) =>
        opts.ctx.prisma.review.findMany({
          where: {
            book: {
              isbn: opts.input.isbn, // getting the reviews for a book
            },
          },
        })
      ),
    post: authedProcedure
      .input(
        z.object({
          isbn: z.string(),
          content: z.string(),
          title: z.string(),
        })
      )
      .mutation(async (opts) => {
        const review = await opts.ctx.prisma.review.create({
          data: {
            content: opts.input.content,
            author: opts.ctx.user.id,
          },
        });

        opts.ctx.prisma.book.update({
          where: {
            isbn: opts.input.isbn,
          },
          data: {
            reviews: {
              connect: {
                id: review.id,
              },
            },
          },
        });
      }),
  },
  getOpenLibraryBook: publicProcedure
    .input(z.object({ isbn: z.string() }))
    .query(async (opts) => {
      return {
        ...(await fetchBookFromIsbn(opts.input.isbn)),
        cover: `https://covers.openlibrary.org/b/isbn/${opts.input.isbn}-M.jpg`,
      };
    }),
  getShelf: authedProcedure.query(async (opts) => {
    return getShelvesForUser(opts.ctx.prisma, opts.ctx.user.id);
  }),
  getShelfByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      return getShelvesForUser(opts.ctx.prisma, opts.input.userId);
    }),
  scan: authedProcedure
    .input(
      z.object({
        isbn: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const book = await opts.ctx.prisma.book.findUniqueOrThrow({
          where: {
            isbn: opts.input.isbn,
          },
        });

        if (!book.ownedBy.includes(opts.ctx.user.id)) {
          await opts.ctx.prisma.book.update({
            where: {
              id: book.id,
            },
            data: {
              ownedBy: {
                push: opts.ctx.user.id,
              },
            },
          });
        }

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

import { z } from "zod";

const bookResponseSchema = z.object({
  numFound: z.literal(1),
  docs: z
    .array(
      z.object({
        title: z.string(),
        author_name: z.array(z.string()),
        subject: z.array(z.string()),
      })
    )
    .length(1),
});

export const fetchBookFromIsbn = async (isbn: string) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?isbn=${isbn}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  const json = await response.json();
  const parsed = bookResponseSchema.parse(json);

  return parsed.docs[0];
};

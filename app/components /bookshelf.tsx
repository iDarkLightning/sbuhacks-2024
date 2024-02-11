import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Drawer } from "vaul";
import { z } from "zod";
import { RouterOutput } from "../../server/trpc";
import { useWindowSize } from "../lib/hooks/use-window-size";
import { trpc } from "../lib/trpc";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

type TBook = RouterOutput["book"]["getShelf"][number][number];

const reviewFormSchema = z.object({
  content: z.string().min(8), // just enough to say "fuck you"
});

const ReviewForm: React.FC<{ book: TBook }> = (props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      content: "",
      // username: "",
    },
  });
  const utils = trpc.useUtils();
  const postReview = trpc.book.review.post.useMutation({
    onSettled: () => utils.book.review.getAll.invalidate(),
  });

  const onSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    postReview.mutate({
      id: props.book.id,
      content: values.content,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 my-4 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Textarea placeholder="This book is so good!" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </Form>
  );
};

const BookCover = (props: { book: TBook }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["book-cover", props.book.isbn],
    queryFn: async () => {
      const url = `https://covers.openlibrary.org/b/isbn/${props.book.isbn}.jpg?default=false`;
      const resp = await fetch(url);

      return { ok: resp.ok, url };
    },
  });

  return (
    <>
      {data.ok ? (
        <img
          className="hover:cursor-pointer mr-1 rounded-md h-[19ch] w-auto"
          src={data.url}
        />
      ) : (
        <div className="hover:cursor-pointer mr-[3ch] rounded-sm font-semibold rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-indigo-950 text-amber-50 truncate max-h-[18ch]">
          {props.book.title}
        </div>
      )}
    </>
  );
};

const Book: React.FC<{ book: TBook; isMine: boolean }> = (props) => {
  const { isDesktop } = useWindowSize();
  const [reviews] = trpc.book.review.getAll.useSuspenseQuery({
    id: props.book.id,
  });
  const user = useUser();

  return (
    <Drawer.Root
      shouldScaleBackground
      direction={isDesktop ? "right" : "bottom"}
    >
      <Drawer.Trigger>
        <BookCover book={props.book} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={cn(
            "bg-white/80 backdrop-blur-md flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 right-0",
            isDesktop
              ? "h-full md:max-w-[70%] lg:max-w-[60%]"
              : "w-full h-max max-h-[95%]"
          )}
        >
          <div
            className={cn(
              "rounded-t-[10px] flex-1",
              isDesktop ? "p-12" : "p-4"
            )}
          >
            {!isDesktop && (
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            )}
            <div className="flex gap-8 items-center flex-row">
              <div className="flex flex-col justify-center">
                <div>
                  <Drawer.Title className="font-medium mb-1 text-xl">
                    {props.book.title}
                  </Drawer.Title>
                  <p className="text-zinc-600 mb-2 text-sm">
                    {props.book.author.join(", ")}
                  </p>
                  <ul className="flex gap-3 flex-wrap md:max-w-xl">
                    {props.book.subjects.slice(0, 5).map((subject, idx) => (
                      <li
                        key={idx}
                        className="bg-indigo-100 rounded-md px-2 border-[0.0125rem] border-indigo-300 py-1.5 font-medium text-indigo-700"
                      >
                        <p className="truncate max-w-48">{subject}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {isDesktop && <BookCover book={props.book} />}
            </div>
            <div className="my-4 flex flex-col gap-4">
              <p className="font-medium">Reviews</p>
              {reviews.length === 0 ? (
                <div className="p-8 border-2 border-dashed items-center justify-center flex flex-col gap-1 border-stone-800">
                  <p className="text-lg font-medium">
                    This book has no reviews
                  </p>
                  {props.isMine ? (
                    <p>Be the first to leave a review below</p>
                  ) : (
                    <p>Read the book and be the first to leave a review!</p>
                  )}
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {reviews.map((review) => (
                    <li key={review.id}>
                      <Link
                        to="/shelf/$userId"
                        className="group"
                        params={{ userId: review.authorId }}
                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex-none">
                            {review.authorImg && (
                              <img
                                src={review.authorImg}
                                className="w-12 h-12 rounded-full"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <p className="font-medium group-hover:underline">
                                {review.authorName}
                              </p>
                              {user.isLoaded &&
                                user.user?.id === review.authorId && (
                                  <p className="bg-indigo-300 py-1 px-4 rounded-md text-sm font-medium border-[0.0125rem] border-indigo-200">
                                    Me
                                  </p>
                                )}
                            </div>

                            <p>{review.content}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {props.isMine && <ReviewForm book={props.book} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const Bookshelf: React.FC<{
  shelves: TBook[][];
  isMine: boolean;
}> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1 p-1 bg-indigo-900 rounded-md shadow-lg w-full">
        {props.shelves.map((shelf, idx) => (
          <div
            key={idx}
            className="flex flex-row flex-nowrap px-1 shadow-[inset_0_-15px_rgba(0,0,0,0.2)] scrollbar-thumb-stone-700 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip h-[20ch] bg-amber-50 rounded-md"
          >
            {shelf.map((book) => (
              <div className="flex-none self-end" key={book.id}>
                <Book book={book} isMine={props.isMine} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

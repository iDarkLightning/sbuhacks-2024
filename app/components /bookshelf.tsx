import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Book } from "@prisma/client";

const Book = (props: { book: Book }) => {
  const [cover, setCover] = useState(false);

  useEffect(() => {
    fetch(
      `https://covers.openlibrary.org/b/isbn/${props.book.isbn}.jpg?default=false`
    ).then((resp) => {
      setCover(resp.ok);
    });
  }, [props.book.isbn]);

  return (
    <>
      {cover ? (
        <img
          className="hover:cursor-pointer mr-1 rounded-md h-[19ch] w-auto"
          src={`https://covers.openlibrary.org/b/isbn/${props.book.isbn}.jpg?default=false`}
        />
      ) : (
        <div className="hover:cursor-pointer mr-[3ch] rounded-sm font-semibold rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-teal-950 text-amber-50">
          {props.book.title}
        </div>
      )}
    </>
  );
};

export const Bookshelf = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();

  return (
    <>
      <div className="flex flex-col gap-1 p-1 bg-teal-900 rounded-md shadow-lg">
        {shelves.map((shelf, idx) => (
          <div
            key={idx}
            className="flex flex-row px-1 shadow-[inset_0_-15px_rgba(0,0,0,0.2)] scrollbar-thumb-stone-700 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip h-[20ch] bg-amber-50 rounded-md"
          >
            {shelf.map((book) => (
              <div className="self-end flex items-end">
                <Dialog>
                  <DialogTrigger key={book.id}>
                    <Book book={book} />
                  </DialogTrigger>
                  <DialogContent className="bg-amber-50">
                    <DialogHeader className="text-2xl">{`${book.title} by ${book.author}`}</DialogHeader>
                    <div>
                      <h1 className="text-lg">Topics:</h1>
                      <p>{book.subjects.join(", ")}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

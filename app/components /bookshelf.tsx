import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";

const Book = (props: { title: string; isbn: string }) => {
  const [cover, setCover] = useState(false);

  useEffect(() => {
    fetch(
      `https://covers.openlibrary.org/b/isbn/${props.isbn}.jpg?default=false`
    ).then((resp) => {
      setCover(resp.ok);
    });
  }, [props.isbn]);

  useEffect(() => {
    console.log(cover);
  }, [cover]);

  return (
    <>
      {cover ? (
        <img
          src={`https://covers.openlibrary.org/b/isbn/${props.isbn}.jpg?default=false`}
        />
      ) : (
        <div className="rounded-sm font-semibold h-fit self-end rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50">
          {props.title}
        </div>
      )}
    </>
  );
};

export const Bookshelf = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();

  return (
    <>
      <div className="flex flex-col gap-1 p-1 bg-orange-800 rounded-sm shadow-lg">
        {shelves.map((shelf, idx) => (
          <div
            key={idx}
            className="flex flex-row shadow-[inset_0_-15px_rgba(0,0,0,0.3)] scrollbar-thumb-orange-900 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip h-[17ch] bg-cyan-900 rounded-sm gap-1"
          >
            {shelf.map((book) => (
              <Book key={book.id} title={book.title} isbn={book.isbn} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

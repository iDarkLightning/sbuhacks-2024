import { trpc } from "../lib/trpc";

const Book = (props: { title: string }) => {
  return (
    <div className="rounded-sm font-semibold h-fit self-end rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50">
      {props.title}
    </div>
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
            className="flex flex-row shadow-[inset_0_-15px_rgba(0,0,0,0.3)] scrollbar-thumb-orange-900 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip max-h-[15ch] bg-cyan-900 rounded-sm gap-1"
          >
            {shelf.map((book) => (
              <div
                key={book.id}
                className="rounded-sm font-semibold h-fit self-end rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50"
              >
                {book.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

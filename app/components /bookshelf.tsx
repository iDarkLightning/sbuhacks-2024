import { useSuspenseQuery } from "@tanstack/react-query";
import { Drawer } from "vaul";
import { RouterOutput } from "../../server/trpc";
import { useWindowSize } from "../lib/hooks/use-window-size";
import { trpc } from "../lib/trpc";
import { cn } from "../lib/utils";

type TBook = RouterOutput["book"]["getShelf"][number][number];

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
        <div className="hover:cursor-pointer mr-[3ch] rounded-sm font-semibold rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-teal-950 text-amber-50">
          {props.book.title}
        </div>
      )}
    </>
  );
};

const Book = (props: { book: TBook }) => {
  const { isDesktop } = useWindowSize();

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
            "bg-white flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 right-0",
            isDesktop ? "h-full w-max min-w-[40%]" : "w-full h-max max-[95%]"
          )}
        >
          <div
            className={cn(
              "bg-white rounded-t-[10px] flex-1",
              isDesktop ? "p-12" : "p-4"
            )}
          >
            <div className="flex gap-8 items-center flex-col md:flex-row">
              {!isDesktop && (
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
              )}

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
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
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
              <Book book={book} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

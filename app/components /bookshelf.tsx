import {
  useEffect,
  useState,
  MouseEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { trpc } from "../lib/trpc";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";

const Book = (props: {
  title: string;
  isbn: string;
  setDialogBook: Dispatch<SetStateAction<string>>;
}) => {
  const [cover, setCover] = useState(false);

  useEffect(() => {
    fetch(
      `https://covers.openlibrary.org/b/isbn/${props.isbn}.jpg?default=false`
    ).then((resp) => {
      setCover(resp.ok);
    });
  }, [props.isbn]);

  const coverOnClick = (event: MouseEvent<HTMLElement>) => {
    console.log(event);
    props.setDialogBook(props.isbn);
  };

  return (
    <div onClick={coverOnClick} id={props.isbn}>
      {cover ? (
        <img
          className="hover:cursor-pointer rounded-md h-[20ch] w-auto"
          src={`https://covers.openlibrary.org/b/isbn/${props.isbn}.jpg?default=false`}
        />
      ) : (
        <div className="hover:cursor-pointer h-fit self-end rounded-sm font-semibold rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50">
          {props.title}
        </div>
      )}
    </div>
  );
};

export const Bookshelf = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();
  const [dialogBook, setDialogBook] = useState("");

  return (
    <Dialog>
      <div className="flex flex-col gap-1 p-1 bg-stone-700 rounded-md shadow-lg">
        {shelves.map((shelf, idx) => (
          <div
            key={idx}
            className="flex flex-row shadow-[inset_0_-15px_rgba(0,0,0,0.2)] scrollbar-thumb-stone-700 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip h-[20ch] bg-amber-50 rounded-md gap-1"
          >
            {shelf.map((book) => (
              <DialogTrigger key={book.id}>
                <Book
                  title={book.title}
                  isbn={book.isbn}
                  setDialogBook={setDialogBook}
                />
              </DialogTrigger>
            ))}
          </div>
        ))}
      </div>
      <DialogContent className="bg-stone-900">
        <DialogHeader>{dialogBook}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

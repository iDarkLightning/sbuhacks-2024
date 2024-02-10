import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const Bookshelf = () => {
  const [shelves, setShelves] = useState<string[][]>([]);

  useEffect(() => {
    setShelves([
      [
        "Piranesi",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Harry Potter",
        "The Food Lab",
        "Lorem Ipsum",
        "Harry Potter and the",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Lorem Ipsum",
        "Lickin' up tables",
      ],
      [
        "ACOTAR",
        "The Color of Law",
        "Percy Jackson and The Olympians",
        "Happy Place",
      ],
    ]);
  }, []);

  return (
    <div className="relative flex flex-col gap-1 p-1 pb-0 bg-orange-800 rounded-sm shadow-md">
      {shelves.map((shelf) => (
        <div className="flex flex-row shadow-[inset_0_-15px_rgba(0,0,0,0.3)] scrollbar-thumb-orange-900 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip max-h-[15ch] bg-cyan-900 rounded-sm gap-1">
          {shelf.map((book) => (
            <div className="rounded-sm font-semibold h-fit self-end rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50">
              {book}
            </div>
          ))}
        </div>
      ))}
      <Dialog>
        <DialogTrigger>
          <div className="absolute right-2 top-2 bg-lime-500 p-1 rounded-sm outline outline-2 outline-lime-600 hover:bg-lime-400 transition-colors">
            <MdEdit />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-amber-50">
          <p>Number of shelves:</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

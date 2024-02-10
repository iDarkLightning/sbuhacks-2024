import { useEffect, useState } from "react";

export const Bookshelf = () => {
  const [shelves, setShelves] = useState<string[][]>([]);

  useEffect(() => {
    setShelves([
      [
        "Piranesi",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Lorem Ipsum",
        "Piranesi",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Piranesi",
        "The Memory Theater",
        "Lorem Ipsum",
      ],
      ["ACOTAR"],
    ]);
  }, []);

  return (
    <div className="flex flex-col p-1 bg-orange-900 rounded-sm shadow-md">
      {shelves.map((shelf) => (
        <div className="flex flex-row scrollbar-thumb-orange-900 scrollbar-track-orange-800 scrollbar-thin scrollbar-rounded-lg overflow-x-scroll overflow-y-clip max-h-[15ch] bg-neutral-100 rounded-sm gap-1">
          {shelf.map((book) => (
            <div className="w-fit rounded-sm [user-select:none] p-1 whitespace-nowrap [writing-mode:vertical-rl] bg-neutral-300">
              {book}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

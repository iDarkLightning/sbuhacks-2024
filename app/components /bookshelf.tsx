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
    <>
      <div className="flex flex-col gap-1 p-1 bg-orange-800 rounded-sm shadow-lg">
        {shelves.map((shelf) => (
          <div className="flex flex-row shadow-[inset_0_-15px_rgba(0,0,0,0.3)] scrollbar-thumb-orange-900 scrollbar-track-transparent scrollbar-thin overflow-x-auto overflow-y-clip max-h-[15ch] bg-cyan-900 rounded-sm gap-1">
            {shelf.map((book) => (
              <div className="rounded-sm font-semibold h-fit self-end rotate-180 [user-select:none] p-2 whitespace-nowrap [writing-mode:vertical-rl] bg-amber-50">
                {book}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

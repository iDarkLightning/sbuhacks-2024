import { BookScanner } from "../components /bookScanner";
import { Bookshelf } from "../components /bookshelf";
import { trpc } from "../lib/trpc";
// import { GetRecs } from "../components /getRecs";

const Shelves = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();

  return <Bookshelf shelves={shelves} />;
};

export const DashboardView = () => {
  return (
    <>
      <div className="flex justify-between my-4 items-center">
        <p className="text-lg font-semibold">My Bookshelf</p>
        <BookScanner />
      </div>
      <Shelves />
      {/* <GetRecs /> */}
    </>
  );
};

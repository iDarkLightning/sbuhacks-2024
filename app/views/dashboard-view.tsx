import { BookScanner } from "../components /bookScanner";
import { Bookshelf } from "../components /bookshelf";
import { RecDrawer } from "../components /getRecs";
import { trpc } from "../lib/trpc";

const Shelves = () => {
  const [shelves] = trpc.book.getShelf.useSuspenseQuery();

  return <Bookshelf shelves={shelves} isMine />;
};

export const DashboardView = () => {
  return (
    <>
      <div className="flex justify-between my-4 md:items-center flex-col md:flex-row gap-2">
        <p className="text-lg font-semibold">My Bookshelf</p>
        <div className="flex items-center gap-2 flex-wrap">
          <BookScanner />
          <RecDrawer />
        </div>
      </div>
      <Shelves />
    </>
  );
};

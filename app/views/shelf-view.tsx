import { getRouteApi } from "@tanstack/react-router";
import { Bookshelf } from "../components /bookshelf";
import { trpc } from "../lib/trpc";

const routeApi = getRouteApi("/main-layout/shelf/$userId");

export const ShelfView = () => {
  const params = routeApi.useParams();
  const [shelves] = trpc.book.getShelfByUser.useSuspenseQuery({
    userId: params.userId,
  });

  return (
    <>
      <div className="flex justify-between my-4 items-center">
        <p className="text-lg font-semibold">
          {shelves.user.firstName}'s Bookshelf
        </p>
      </div>
      <Bookshelf shelves={shelves.shelves} isMine={false} />
    </>
  );
};

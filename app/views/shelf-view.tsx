import { getRouteApi } from "@tanstack/react-router";
import { trpc } from "../lib/trpc";
import { Bookshelf } from "../components /bookshelf";

const routeApi = getRouteApi("/shelf/$userId");

export const ShelfView = () => {
  const params = routeApi.useParams();
  const [shelves] = trpc.book.getShelfByUser.useSuspenseQuery({
    userId: params.userId,
  })

  return (
    <div>
      <h1>Shelf</h1>
      <Bookshelf shelves={shelves} />
    </div>
  );
};

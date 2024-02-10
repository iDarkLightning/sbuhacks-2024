import { trpc } from "../lib/trpc";
import { Bookshelf } from "../components /bookshelf";

export const HomeView = () => {
  const [data] = trpc.test.useSuspenseQuery();

  return (
    <div>
      <h1>{data}</h1>
      <Bookshelf />
    </div>
  );
};

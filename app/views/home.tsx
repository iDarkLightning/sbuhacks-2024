import { trpc } from "../lib/trpc";
import { Bookshelf } from "../components /bookshelf";

export const HomeView = () => {
  const [data] = trpc.test.useSuspenseQuery();

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
      <Bookshelf />
    </div>
  );
};

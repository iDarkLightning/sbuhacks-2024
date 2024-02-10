import { trpc } from "../lib/trpc";

export const HomeView = () => {
  const [data] = trpc.test.useSuspenseQuery();

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

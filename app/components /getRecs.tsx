import { trpc } from "../lib/trpc";

export const GetRecs = () => {
  const [data] = trpc.book.getRecs.useSuspenseQuery(undefined, {
    retry: false,
  });

  return <div>{JSON.stringify(data)}</div>;
};

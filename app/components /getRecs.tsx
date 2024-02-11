import { trpc } from "../lib/trpc";

export const GetRecs = () => {
  const [data] = trpc.book.getRecs.useSuspenseQuery(undefined, {
    retry: false,
  });

  return (
    <>
      <h1 className="text-2xl">AI Recommends</h1>
      <div className="whitespace-pre-wrap">{data.content}</div>
    </>
  );
};

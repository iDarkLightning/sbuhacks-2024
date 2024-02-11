import { Drawer } from "vaul";
import { trpc } from "../lib/trpc";
import { cn } from "../lib/utils";
import { useWindowSize } from "../lib/hooks/use-window-size";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { HiSparkles } from "react-icons/hi";

export const GetRecs = () => {
  const [data] = trpc.book.getRecs.useSuspenseQuery(undefined, {
    retry: false,
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-medium">AI Recommends</p>
      <div className="whitespace-pre-wrap max-w-4xl">{data.content}</div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        transform="translate(1 1)"
        stroke-width="2"
      >
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="1.5s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="1.5s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="3s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="3s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="3s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="8">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.5s"
            values="6;1;2;3;4;5;6"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export const RecDrawer = () => {
  const { isDesktop } = useWindowSize();

  return (
    <Drawer.Root
      shouldScaleBackground
      direction={isDesktop ? "right" : "bottom"}
    >
      <Drawer.Trigger>
        <Button className="bg-amber-300 text-stone-800 transition-colors hover:bg-amber-400/50 border-amber-500">
          <HiSparkles />
          View AI Recommendations
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={cn(
            "bg-white/80 backdrop-blur-md flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 right-0",
            isDesktop
              ? "h-full min-w-[30%] md:max-w-[40%] lg:max-w-[50%]"
              : "w-full h-max max-h-[95%]"
          )}
        >
          <div
            className={cn(
              "rounded-t-[10px] flex-1 overflow-auto",
              isDesktop ? "p-12" : "p-4"
            )}
          >
            {!isDesktop && (
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            )}
            <div className="flex flex-col">
              <Drawer.Title className="font-medium mb-1 text-xl">
                AI Recommendations
              </Drawer.Title>
              <p className="text-zinc-600 mb-2 text-sm">
                View a custom curated list of books that you should try based on
                your reading history.
              </p>
            </div>
            <div className="flex items-center justify-center my-8">
              <Suspense fallback={<LoadingSpinner />}>
                <GetRecs />
              </Suspense>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

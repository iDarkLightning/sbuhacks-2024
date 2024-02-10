import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter } from "./router";
import { queryClient } from "./lib/query-client";
import { trpcClient } from "./lib/trpc";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  const builtRouter = createRouter({
    queryClient,
    trpcClient,
  });

  root.render(
    <StrictMode>
      <RouterProvider router={builtRouter} />
    </StrictMode>
  );
}

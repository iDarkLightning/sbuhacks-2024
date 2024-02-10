import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { queryClient } from "./lib/query-client";
import { createTrpcClient } from "./lib/trpc";
import { createRouter } from "./router";

const rootElement = document.getElementById("root")!;

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

export const InnerApp = () => {
  const auth = useAuth();

  const router = createRouter({
    queryClient,
    trpcClient: createTrpcClient(auth.getToken),
  });

  return <RouterProvider router={router} context={{ authState: auth }} />;
};

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <InnerApp />
      </ClerkProvider>
    </StrictMode>
  );
}

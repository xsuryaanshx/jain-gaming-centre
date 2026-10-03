import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const getBasepath = () => {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/jain-gaming-centre")) {
    return "/jain-gaming-centre";
  }
  return undefined;
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath: getBasepath(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

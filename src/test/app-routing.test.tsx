import { describe, expect, it } from "vitest";
import { rootRouteId } from "@tanstack/react-router";
import { getRouter } from "@/router";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = getRouter();
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toBe("/");
  });

  it("handles GitHub Pages repository subpath /jain-gaming-centre correctly", () => {
    // Simulate GitHub Pages URL
    window.history.pushState({}, "", "/jain-gaming-centre/");
    const router = getRouter();
    expect(router.basepath).toBe("/jain-gaming-centre");
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).toBe("/");
  });
});

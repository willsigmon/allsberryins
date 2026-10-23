"use client";

import { useEffect } from "react";

import type { ModelContext } from "./register-webmcp-tools";

/**
 * Registers the site's read-only WebMCP tools when the browser (or an extension
 * polyfill) exposes a model context. Renders nothing and is a no-op otherwise.
 * None of these tools submit forms, send email/SMS, or book anything.
 */
export default function WebMcpProvider() {
  useEffect(() => {
    const scope = globalThis as unknown as {
      document?: { modelContext?: ModelContext };
      navigator?: { modelContext?: ModelContext };
    };
    const modelContext = scope.document?.modelContext ?? scope.navigator?.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== "function") return;

    let disposed = false;
    let unregister: (() => void) | undefined;
    void import("./register-webmcp-tools").then(({ registerWebMcpTools }) => {
      if (!disposed) unregister = registerWebMcpTools(modelContext);
    }).catch(() => {
      // Optional browser capability must not interrupt the site's normal UI.
    });

    return () => {
      disposed = true;
      unregister?.();
    };
  }, []);

  return null;
}

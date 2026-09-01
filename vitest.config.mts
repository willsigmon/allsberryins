import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "src/lib/agent-qr.test.ts",
      "src/lib/hero-product-preferences.test.ts",
      "src/lib/i18n-messages.test.ts",
      "src/lib/lead-email.test.ts",
      "src/lib/lead-schemas.test.ts",
      "src/lib/locale-path.test.ts",
      "src/lib/quote-routing.test.ts",
      "src/lib/request-rate-limit.test.ts",
      "src/lib/site-data.test.ts",
      "src/lib/sms-consent.test.ts",
      "src/lib/theme.test.ts",
      "src/lib/tracking.test.ts",
      "src/lib/utils.test.ts",
      "src/lib/uuid.test.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});

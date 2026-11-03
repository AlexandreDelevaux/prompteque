import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Les specs Playwright sont exécutées par `npm run test:e2e`.
    exclude: ["**/node_modules/**", "**/.next/**", "**/tests/e2e/**"],
  },
});

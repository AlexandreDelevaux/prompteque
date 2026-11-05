import { defineConfig } from "vitest/config";

// Apprend à Vitest le raccourci @/ de Next.js (les « paths » de tsconfig.json).
// Extension .mts : en .ts, Vite affiche un avertissement à chaque npm test, faute de "type": "module" dans package.json.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    // Les specs Playwright sont exécutées par `npm run test:e2e`.
    exclude: ["**/node_modules/**", "**/.next/**", "**/tests/e2e/**"],
  },
});

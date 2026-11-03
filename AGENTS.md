<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Prompthèque — agent notes

Small French-language Next.js 16 App Router site. Prompts live in `data/prompts.json`; there is no database, auth, or runtime env config.

## Commands

Node >= 22.12.

- Install: `npm install`
- Dev: `npm run dev`
- Unit tests: `npm test` (Vitest, `tests/recherche.test.ts`; e2e excluded in `vitest.config.mts`)
- Single unit test: `npx vitest run tests/recherche.test.ts -t "ignore la casse"`
- Browser tests: `npm run test:e2e` (Playwright; specs in `tests/e2e/`; first run needs `npx playwright install chromium`)
- Single browser test: `npx playwright test tests/e2e/copier-prompt.spec.ts -g "chaque fiche"`
- Typecheck: `npx tsc --noEmit` (there is no lint or format script)
- Production: `npm run build && npm start`

On this machine Node is not on PATH. Prefix commands with
`$env:Path = 'C:\dev\.tools\node-v24.22.1-win-x64;' + $env:Path` and use `npm.cmd` / `npx.cmd` (PowerShell blocks the `.ps1` shims).

## Architecture

- `app/page.tsx` is a server component that passes all prompts to `components/Recherche.tsx`. Filtering happens in the browser; the API is not used by the UI.
- `app/prompt/[id]/page.tsx` awaits `params` (Next 16 async params), uses `generateStaticParams()` over `data/prompts.json`, and renders token/cost estimates. It embeds the client component `components/BoutonCopier.tsx`, which copies the full prompt and shows an alert if clipboard access fails.
- `app/api/prompts/route.ts` is `GET /api/prompts`: returns the full array, with no query or pagination.
- `lib/` holds pure functions (`rechercher`, `estimerTokens`, `coutEnvoi`, `exporterEnMarkdown`) and the hardcoded `MODELES` price table.
- `data/prompts.json` is imported directly; there is no schema validation.

## Conventions

- Follow the French naming of the codebase: identifiers (`titre`, `jour`, `texte`, `rechercher`, `trouverPrompt`, `coutEnvoi`, `MODELES`), UI copy, CSS classes, and test descriptions are French. Keep new code consistent.
- Styling is plain CSS in `app/globals.css` using existing classes (`carte`, `grille`, `champ`, `detail`, `tags`); no Tailwind or CSS modules.
- Path alias `@/*` maps to the repo root.
- To add a prompt, edit `data/prompts.json` only: unique lowercase kebab-case `id`, `jour` 1–10, lowercase `tags`. The static detail page is generated automatically.

## Agents OpenCode

`.opencode/agents/` définit la chaîne éditoriale :

- `orchestrateur` (primary) : rédige la fiche, puis fait écrire et relire. `edit` et `shell` sont refusés : il ne modifie jamais un fichier lui-même.
- `orchestrateur-bilan` (primary) : en fin de session, critique les prompts et la conversation, en tire une à trois fiches, les fait écrire par le curateur, vérifie le fichier, puis fait relire. Même refus de `edit` et `shell`.
- `curateur` (all) : seul agent autorisé à écrire dans `data/prompts.json`.
- `relecteur` (subagent) : relit le périmètre qu'on lui donne et termine par `VERDICT: conforme` ou `VERDICT: non conforme`.

La commande `/fin-de-session` lance `orchestrateur-bilan` ; son périmètre est passé en argument (« rapide » pour un bilan court).

Les orchestrateurs ne peuvent lancer que `curateur` et `relecteur`. Le dossier n'est pas un dépôt git : le relecteur lit les fichiers directement, il ne peut pas s'appuyer sur `git diff`.

## Known inconsistencies (verify intent before "fixing")

- `prompteque.config.json` is not imported anywhere; editing it has no runtime effect. `USD` is hardcoded in `app/prompt/[id]/page.tsx` and prices are hardcoded in `lib/modeles.ts`.
- The README says search ignores accents, but `lib/recherche.ts` only lowercases; `securite` does not match `sécurité`.
- `lib/tokens.ts` computes words/4 while its comment and the UI say "1 token ≈ 4 characters"; `lib/cout.ts` divides tokens by 1,000 although prices are per million (displayed cost is 1000× too high).
- Unit tests cover only `rechercher`; no jsdom or React Testing Library is installed for component tests.
- Playwright is installed as the `playwright` package and specs import from `playwright/test` (not `@playwright/test`). The config reuses an existing dev server on `localhost:3000`; Next 16 refuses a second dev server in the same directory, so do not point it at another port while one is running.

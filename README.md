# Prompthèque

Les prompts de la semaine 1 de la formation, rangés et cherchables : une recherche sur l'accueil, une page par prompt avec l'estimation de ses tokens et de son coût d'envoi, et une petite API. Next.js 16, React 19, TypeScript. Aucune base de données, aucun secret.

## Lancer

Node 22.12 ou plus.

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 (ou le port affiché par `npm run dev`).

## Tester

```bash
npm test          # tests unitaires Vitest
npm run test:e2e  # tests navigateur Playwright
```

Au premier lancement, installer le navigateur Playwright : `npx playwright install chromium`.

Les tests Playwright démarrent le serveur de développement si nécessaire (ou réutilisent celui qui écoute déjà sur le port 3000), parcourent toutes les fiches accessibles depuis l'accueil et vérifient que le bouton « Copier le prompt » alimente le presse-papiers avec le texte complet.

## Construire

```bash
npm run build
npm start
```

## La recherche

La recherche filtre les prompts sur leur titre, leur texte et leurs tags. Elle ignore la casse et les accents : « securite » trouve les prompts marqués « sécurité ».

## Organisation

- `app/` : l'accueil, la page d'un prompt (`app/prompt/[id]/`) et l'API `GET /api/prompts`.
- `components/Recherche.tsx` : le champ de recherche et la grille des prompts.
- `components/BoutonCopier.tsx` : le bouton de copie du prompt dans le presse-papiers.
- `lib/` : la recherche, l'estimation des tokens, le coût d'envoi, les tarifs des modèles, l'export en Markdown.
- `data/prompts.json` : les prompts.
- `prompteque.config.json` : les réglages (titre, devise, modèle par défaut, prompts par page).
- `tests/` : les tests Vitest ; `tests/e2e/` : les tests Playwright.

## Ajouter un prompt

Chaque prompt de `data/prompts.json` suit le même schéma :

```json
{
  "id": "mise-en-ligne",
  "titre": "Préparer la mise en ligne",
  "jour": 5,
  "tags": ["vercel", "github", "pull-request"],
  "texte": "Le prompt complet, tel qu'on le colle dans l'agent.",
  "source": "J5 · landing en ligne"
}
```

`id` unique, en minuscules avec des tirets ; `jour` de 1 à 10 ; `tags` en minuscules.

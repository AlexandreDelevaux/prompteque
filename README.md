# Prompthèque

Les prompts de la semaine 1 de la formation, rangés et cherchables, avec un menu latéral qui mène aussi aux MCP, aux commandes et aux skills. Chaque fiche a sa page, son bouton de copie et, pour les prompts, l'estimation de ses tokens et de son coût d'envoi. Next.js 16, React 19, TypeScript. Aucune base de données, aucun secret.

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

Les tests Playwright démarrent le serveur de développement si nécessaire (ou réutilisent celui qui écoute déjà sur le port 3000), parcourent les fiches accessibles depuis chaque onglet et vérifient que le bouton de copie alimente le presse-papiers avec le contenu complet.

## Construire

```bash
npm run build
npm start
```

## La recherche

La recherche filtre les fiches sur leur titre, leur texte, leur description, leur contenu et leurs tags. Elle ignore la casse. Elle ne retire pas encore les accents : « securite » ne trouve pas les fiches marquées « sécurité ».

## Organisation

- `app/` : l'accueil des prompts, les onglets `/mcp`, `/commandes` et `/skills`, une page par fiche, l'API `GET /api/prompts` et l'API `GET /api/ressources/[type]`.
- `components/MenuLateral.tsx` : le menu des quatre onglets et leur compteur.
- `components/Recherche.tsx` : le champ de recherche et la grille des prompts.
- `components/Catalogue.tsx` : le champ de recherche et la grille des MCP, commandes et skills.
- `components/FicheRessource.tsx` : la page commune d'une ressource.
- `components/BoutonCopier.tsx` : le bouton de copie dans le presse-papiers.
- `lib/` : la recherche, les ressources, l'estimation des tokens, le coût d'envoi, les tarifs des modèles, l'export en Markdown.
- `data/prompts.json`, `data/mcp.json`, `data/commandes.json`, `data/skills.json` : le contenu des onglets.
- `prompteque.config.json` : les réglages (titre, devise, modèle par défaut, prompts par page).
- `tests/` : les tests Vitest ; `tests/e2e/` : les tests Playwright.

Le contenu initial de `data/mcp.json`, `data/commandes.json` et `data/skills.json` a été rédigé par le modèle gratuit `opencode/deepseek-v4.1-flash-free` lancé en mode headless (`opencode run`), un run par onglet, puis validé (JSON, ids uniques, schéma).

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

## Ajouter un MCP, une commande ou une skill

Les trois fichiers `data/mcp.json`, `data/commandes.json` et `data/skills.json` partagent le même schéma :

```json
{
  "id": "context7",
  "titre": "Context7, la documentation à jour",
  "description": "Une à deux phrases qui expliquent le service et son intérêt.",
  "tags": ["documentation", "mcp", "recherche"],
  "contenu": "Le bloc de configuration, la commande ou le fichier SKILL.md complet.",
  "source": "MCP · documentation"
}
```

`id` unique dans son fichier, en minuscules avec des tirets. Pour un MCP, `contenu` est un extrait de configuration `opencode.json` ; pour une commande, le Markdown de `.opencode/commands/` ; pour une skill, le `SKILL.md` de `.opencode/skills/<id>/`.

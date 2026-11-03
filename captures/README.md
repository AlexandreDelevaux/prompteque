# Captures visuelles

Chaque exécution de `npm run captures` crée un dossier daté :

```text
captures/AAAA/MM/JJ/HHMMSS/
├── 01-accueil-desktop.png
├── 01-accueil-mobile.png
├── 02-mcp-desktop.png
├── ...
└── manifeste.json
```

Le manifeste contient la date ISO, le commit, la branche, l'URL, la liste des
pages et les fichiers produits. `captures/index.json` garde une entrée par
exécution : c'est l'historique lisible de l'évolution du site.

## Pourquoi versionner les images

Les captures sont volontairement suivies par Git. Elles montrent l'état visuel
du site à un instant précis et permettent de comparer les semaines, les mois et
les années sans relancer l'ancienne version.

Pour limiter le poids du dépôt sur le très long terme, on peut, au besoin,
compresser ou déplacer les dossiers les plus anciens dans une archive séparée.
L'index et les manifestes suffisent alors à retrouver chaque passage.

## Lancer une capture

```bash
npm run captures
```

Le script démarre un serveur de développement s'il n'en trouve pas, capture les
pages en desktop et en mobile, puis arrête le serveur qu'il a démarré.

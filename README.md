# My Recipes

Application mobile Expo / React Native construite autour d'un parcours simple : parcourir des recettes, les rechercher, ouvrir leur detail et suivre leur progression pas a pas.

## Ce qui est en place

- chargement initial avec splash natif, ecran d'initialisation et fallback avec retry
- liste de recettes DummyJSON paginee par 5
- recherche debounced
- detail recette en overlay plein ecran
- coche/decochage des instructions
- calcul du statut `not_started` / `in_progress` / `done`
- persistance locale de la progression dans `AsyncStorage`
- restauration de cette progression au redemarrage

## Choix techniques

- `Expo + React Native + TypeScript strict`
  Pour rester rapide a executer, proche du runtime mobile reel, tout en gardant un socle robuste.

- `Clean Architecture` en vertical slice
  `app/` reste la composition root. La logique `recipes` est regroupee dans `features/recipes/` avec `domain`, `usecases`, `infrastructure` et `presentation`. Les briques partagees restent dans `presentation/` et `shared/`.

- `@tanstack/react-query` pour la liste, la recherche et la pagination
  Pour fiabiliser les flux asynchrones, reutiliser le cache et eviter de reimplementer une orchestration reseau fragile.

- pas de librairie de navigation
  Le scope est single-page ; un overlay de detail suffit et evite une complexite inutile.

- `fetch` encapsule dans un client d'API + repository
  Pour garder la couche reseau simple, testable et remplacable.

- `AsyncStorage` pour la progression
  C'est le bon niveau de persistance pour une donnee legere, locale et sans besoin de sync distante.

## Architecture

```text
src/
  app/                  composition root uniquement
  features/
    recipes/
      domain/           entites, ports, types de startup
      usecases/         orchestration metier de la feature
      infrastructure/   API client + repository concret
      presentation/     pages, hooks et composants propres a recipes
  presentation/         UI partagee, theme, providers, hooks transversaux
  shared/
    domain/             Result, Failure, Paginated, RequestStatus
    i18n/               ressources de traduction
```

Ce decoupage permet d'ajouter une nouvelle feature sans recreer un `core/` horizontal ou melanger plusieurs domaines metier dans les memes dossiers.

## Qualite

- lint, typecheck et tests Jest en place
- validation defensive des payloads API et storage
- hooks Git via Husky + lint-staged

## Lancer le projet

```bash
sh run start
sh run ios
sh run android
```

Checks principaux :

```bash
sh run lint
sh run typecheck
sh run test --runInBand
```

## Notes

- les textes UI sont centralises dans le systeme i18n du projet

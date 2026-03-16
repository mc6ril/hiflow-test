# Test technique mobile - cadrage, décisions et architecture

## 1. Objectif du document

Ce document sert de référence unique pour :

- reformuler précisément l'énoncé ;
- fixer les choix techniques avant l'implémentation ;
- définir une clean architecture adaptée à un test technique mobile ;
- éviter les décisions tardives et la sur-ingénierie.

Le projet sera réalisé à partir du repo actuel en **Expo + React Native + TypeScript strict**.

## 2. Références

- Figma : https://www.figma.com/board/Y83nlWzF6tZipYFzJRDeeP/Test-Technique-Dev-Mobile?node-id=0-1&p=f
- Énoncé fourni : `documentation/enonce.png`
- Maquettes : `documentation/screens.png`
- API recettes : https://dummyjson.com/recipes
- Documentation API : https://dummyjson.com/docs/recipes

## 3. Reformulation claire du besoin

L'application demandée est une **app mobile single-page** permettant de gérer un parcours "Mes recettes".

Le besoin impose :

- afficher une liste de recettes récupérées depuis DummyJSON ;
- charger la liste par paquets de **5 recettes** avec chargement au scroll ;
- proposer une **recherche** depuis la liste ;
- ouvrir le **détail** d'une recette ;
- afficher les **ingrédients** et les **instructions** ;
- permettre de cocher les étapes réalisées ;
- calculer un statut de progression :
  - `In Progress` : au moins une étape cochée mais pas toutes ;
  - `Done` : toutes les étapes cochées ;
- permettre plusieurs recettes en parallèle ;
- persister localement la progression ;
- retrouver cette progression au redémarrage ;
- afficher un écran d'initialisation au lancement ;
- afficher un fallback avec retry sur erreur bloquante ;
- centraliser les textes UI dans un unique fichier `fr.json`.

## 4. Hypothèses et clarifications retenues

Les points suivants sont actés pour éviter les ambiguïtés :

### 4.1 Single-page

Le terme "single-page" est interprété comme :

- **une seule route principale** ;
- plusieurs **états d'interface** dans cette route ;
- une vue détail affichée sous forme de **modal plein écran** ou d'overlay, et non via un routeur complet.

Conclusion : **pas de librairie de navigation en V1**.

### 4.2 Recherche

La recherche utilisera l'endpoint DummyJSON dédié :

- `GET /recipes/search?q=...`

La pagination restera cohérente avec la liste :

- `limit=5`
- `skip=0, 5, 10...`

### 4.3 Persistance

Seule la **progression utilisateur** est persistée localement.

On ne persiste pas :

- le catalogue complet des recettes ;
- les résultats de recherche ;
- l'état visuel de la liste.

### 4.4 Langue

Tous les **textes UI** seront gérés en français via `fr.json`.

En revanche, le **contenu de l'API** peut rester dans sa langue d'origine :

- nom de recette ;
- ingrédients ;
- instructions.

### 4.5 Détail recette

L'API liste retourne déjà les données nécessaires au détail, notamment :

- `ingredients`
- `instructions`
- `image`

Donc :

- **pas de second appel obligatoire au clic sur une recette** ;
- `getRecipeById` reste **optionnel** et ne sera ajouté qu'en cas de besoin réel.

### 4.6 Gestion des erreurs

On distingue deux niveaux d'erreur :

- **erreur bloquante** : startup impossible ou premier chargement impossible -> écran fallback plein écran ;
- **erreur non bloquante** : pagination, recherche ou sauvegarde locale -> message inline ou feedback local, sans sortir brutalement du flux principal.

### 4.7 Erreur de lecture de progression au démarrage

Si la lecture AsyncStorage échoue au démarrage, on considère la progression comme **vide** (on ne bloque pas l'app). Seul un crash réseau empêchant de charger la première page est traité comme une erreur bloquante.

## 5. Choix techniques tranchés

L'objectif est de rester propre, testable et crédible pour un test technique, sans multiplier les dépendances.

| Sujet                   | Choix retenu                                                 | Pourquoi                                                                                   |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Runtime                 | Expo managed workflow                                        | Déjà en place dans le repo, rapide à exécuter et cohérent avec le scope                    |
| Versionnement technique | Base actuelle du repo : Expo 55, React 19, React Native 0.83 | On aligne la doc sur l'existant                                                            |
| Architecture            | **Clean Architecture stricte par couches**                   | Une seule architecture lisible : `core`, `infrastructure`, `presentation`, `shared`, `app` |
| Navigation              | **Pas de router en V1**                                      | Le besoin est single-page ; un state machine + modal suffit                                |
| Réseau                  | `fetch` natif encapsulé dans un `ApiClient`                  | Une seule API simple ; inutile d'ajouter `axios`                                           |
| Liste                   | `FlatList`                                                   | Suffisant pour un dataset petit/moyen et pagination par 5                                  |
| Images                  | `expo-image`                                                 | Composant Expo performant avec cache natif                                                 |
| Splash natif            | `expo-splash-screen`                                         | Permet de garder le splash visible pendant l'initialisation                                |
| Safe areas              | `react-native-safe-area-context`                             | Standard Expo / React Native pour gérer encoches et insets                                 |
| Persistance             | `@react-native-async-storage/async-storage`                  | Suffisant pour une progression légère, compatible Expo Go                                  |
| État applicatif         | Hooks contrôleurs + `useReducer`/Context local               | Le scope ne justifie ni Redux ni Zustand                                                   |
| Requêtes asynchrones    | Pas de TanStack Query en V1                                  | Le pattern use cases + repositories couvre déjà le besoin                                  |
| UI                      | Composants React Native + `StyleSheet` + tokens de thème     | Maîtrise du rendu, zéro couche abstraite inutile                                           |
| i18n                    | Un seul fichier `src/shared/i18n/fr.json` + helper `t()`     | Répond à l'énoncé et garde un coût faible                                                  |
| Tests                   | Jest + `jest-expo` + `@testing-library/react-native`         | Stack recommandée pour Expo et React Native                                                |
| Qualité                 | TypeScript strict + ESLint + Prettier                        | Socle minimal sérieux pour la livraison                                                    |
| Vérifications Git       | `husky` + `lint-staged`                                      | Automatise les checks utiles avant commit et avant push                                    |

## 6. Choix explicitement non retenus

Pour garder le projet lisible et pertinent :

- pas de `expo-router` ni `react-navigation` en V1 ;
- pas de `axios` ;
- pas de `react-query` / `@tanstack/react-query` ;
- pas de `redux` / `zustand` ;
- pas de UI kit externe ;
- pas de MMKV : AsyncStorage suffit ici.

### Pourquoi ne pas utiliser `expo-router`, `zustand` ou `axios` ici ?

Ces outils sont bons, mais ils ne répondent pas à un besoin indispensable dans le périmètre actuel.

#### `expo-router`

Expo Router est un routeur file-based construit pour gérer la navigation entre plusieurs routes, avec des bénéfices forts sur :

- la navigation multi-écrans ;
- les deep links ;
- les URLs web ;
- les routes typées ;
- les layouts imbriqués.

Dans ce test, le besoin actuel est plus simple :

- une app annoncée comme **single-page** ;
- une liste principale ;
- un détail pouvant être affiché en modal ;
- aucun besoin explicite de deep linking, tabs, stack complexe ou navigation web.

Conclusion :

- **on n'a pas besoin d'un routeur pour ouvrir le détail d'une recette** ;
- un simple état `selectedRecipe` + une modal plein écran couvre le besoin ;
- ajouter Expo Router introduirait une structure de routes qui n'apporte pas de valeur immédiate sur ce scope.

On le reconsidère si le test évolue vers :

- plusieurs sections de l'app ;
- navigation hiérarchique réelle ;
- partage de liens vers un écran précis ;
- version web avec URL significatives.

#### `zustand`

Zustand est très pertinent quand on a :

- un vrai état global partagé entre plusieurs zones de l'app ;
- plusieurs écrans qui lisent et modifient les mêmes données ;
- un besoin de store global durable et indépendant de l'arbre React.

Dans ce test, l'état utile reste concentré dans une seule feature :

- liste de recettes affichées ;
- recherche en cours ;
- recette sélectionnée ;
- progression par recette ;
- états `loading`, `error`, `ready`.

Cet état peut être piloté proprement avec :

- un hook contrôleur de feature ;
- `useReducer` pour les transitions d'état ;
- un Context local uniquement si plusieurs sous-composants doivent partager cet état.

Conclusion :

- **la progression des recettes n'impose pas un store global** ;
- la persistance de progression relève surtout du repository local (`AsyncStorage`), pas d'un state manager ;
- introduire Zustand maintenant ajouterait une abstraction supplémentaire sans bénéfice fonctionnel net.

On le reconsidère si :

- l'état devient partagé par plusieurs features ;
- plusieurs écrans indépendants doivent se synchroniser fortement ;
- on veut exposer un store global découplé de la hiérarchie UI.

#### `axios`

Axios est utile quand on a besoin de capacités avancées comme :

- interceptors de requêtes/réponses ;
- stratégie d'authentification ;
- refresh token ;
- configuration réseau plus riche ;
- sérialisation personnalisée ;
- gestion uniforme de nombreux endpoints complexes.

Ici, le besoin réseau est volontairement simple :

- une API publique ;
- essentiellement des `GET` ;
- pas d'auth ;
- pas d'interceptors ;
- pas de besoin indispensable au-delà d'un client HTTP très léger.

React Native fournit déjà `fetch`, et la doc officielle le recommande pour les besoins de networking courants.

Conclusion :

- **le fetch de toutes les recettes ne nécessite pas Axios** ;
- **le refetch au scroll ne nécessite pas Axios non plus** : c'est surtout une logique de pagination et d'état UI ;
- encapsuler `fetch` dans un `ApiClient` suffit pour garder le code testable et remplaçable plus tard.

On le reconsidère si :

- l'API se complexifie ;
- on ajoute auth, interceptors, timeout policy, retry policy centralisée ;
- on veut standardiser une couche réseau plus robuste sur plusieurs ressources.

### Ce qu'il faut retenir

- **navigation du détail** : un état local + une modal suffisent ;
- **progression des recettes** : repository + état de feature suffisent ;
- **fetch initial / pagination / refetch au scroll** : `fetch` + repository + contrôleur d'écran suffisent ;
- ces librairies ne sont pas rejetées parce qu'elles sont mauvaises, mais parce qu'elles seraient prématurées pour ce test.

### Dépendances à ajouter

Runtime :

- `expo-image`
- `expo-splash-screen`
- `react-native-safe-area-context` _(vérifier si déjà présente dans le repo Expo)_
- `@react-native-async-storage/async-storage`

Dev :

- `jest`
- `jest-expo`
- `@types/jest`
- `@testing-library/react-native`
- `eslint`
- `prettier`
- `husky`
- `lint-staged`

### Vérifications Git automatisées

Choix retenu :

- utiliser `husky` pour brancher des scripts Git locaux ;
- utiliser `lint-staged` pour limiter les vérifications du `pre-commit` aux fichiers stagés ;
- garder le `pre-commit` rapide ;
- réserver les vérifications plus coûteuses au `pre-push`.

Stratégie visée :

- `pre-commit` :
  - `eslint --fix` sur les fichiers JavaScript / TypeScript stagés ;
  - `prettier --write` sur les fichiers stagés pertinents ;
- `pre-push` :
  - `npm run typecheck`
  - `npm run test`

Objectif :

- éviter les commits manifestement cassés ;
- détecter les erreurs de lint avant qu'elles n'arrivent sur le dépôt ;
- lancer les checks plus lents juste avant le push, pas à chaque commit.

## 7. Architecture cible

La clean architecture retenue est **stricte par couches**.

Il n'y a **pas** de `feature/recipes` qui recrée un mini-domain, un mini-usecases et un mini-presentation dans son coin.

On a une seule architecture lisible :

- `core/` : métier pur
- `infrastructure/` : implémentations concrètes
- `presentation/` : UI, hooks et providers
- `shared/` : constantes, assets, i18n, thème, utilitaires
- `app/` : composition root

### 7.1 Règle de dépendance

Flux fonctionnel :

```txt
UI Page
  -> Presentation Hook
  -> Core Usecase
  -> Core Port
  -> Infrastructure Repository
  -> API / AsyncStorage
```

Règles :

- `core/domain/` contient les types métier et les règles métier pures
- `core/usecases/` orchestre le métier et dépend seulement de `core/domain/` et `core/ports/`
- `core/ports/` contient les contrats de repository
- `infrastructure/` implémente les ports
- `presentation/` ne contient pas de logique métier
- `shared/` peut être importé partout, mais ne contient jamais de logique métier
- `app/` se limite à composer les dépendances et démarrer l'application

Interdits :

- pas de React dans `core/`
- pas d'API ou de storage dans `core/`
- pas de logique métier dans `presentation/`
- pas d'UI dans `infrastructure/`

### 7.2 Composition root retenue

La composition root vit dans `app/`.

Aujourd'hui, `createAppDependencies()` expose surtout les dépendances transverses (`i18n`, thème). Ensuite, ce même point d'entrée recevra aussi les repositories et les use cases branchés sur `infrastructure/`.

```ts
// app/createAppDependencies.ts
export const createAppDependencies = (): AppDependencies => ({
  i18n: createI18n(),
  theme: appTheme,
});
```

### 7.3 Responsabilités par couche

- `core/domain/`
  - types métier
  - règles métier pures
  - aucune dépendance React Native / Expo / HTTP / storage
- `core/ports/`
  - contrats de repository
  - aucun code concret
- `core/usecases/`
  - orchestration métier
  - fonctions pures ou quasi pures branchées sur des ports
- `infrastructure/`
  - fetch / AsyncStorage
  - DTO, mappers, repositories concrets
- `presentation/`
  - pages
  - layout
  - providers
  - hooks
  - composants UI
- `shared/`
  - assets
  - thème
  - i18n
  - constantes et utilitaires transverses
- `app/`
  - point d'entrée et composition root

## 8. Arborescence retenue

```txt
src/
  app/
    AppRoot.tsx
    createAppDependencies.ts
  core/
    domain/
      failures.ts
      paginated.ts
      recipes.ts
      result.ts
    ports/
      recipesRepository.ts
    usecases/
      hydrateRecipeProgress.ts
      listRecipes.ts
      searchRecipes.ts
      toggleInstructionStep.ts
  infrastructure/
    http/
    recipes/
  presentation/
    components/
      bootstrap-card/
        BootstrapCard.tsx
        styles.ts
      ui/
    hooks/
      useI18n.ts
      useRequiredDependencies.ts
      useTheme.ts
    layout/
      AppProviders.tsx
    pages/
      bootstrap/
        BootstrapPage.tsx
        styles.ts
    providers/
      AppDependenciesProvider.tsx
  shared/
    assets/
      images/
    i18n/
      createI18n.ts
      fr.json
      resolveTranslation.ts
      resources.ts
      types.ts
    theme/
      appTheme.ts
      colors.ts
      spacing.ts
      typography.ts
    utils/
```

Note :

- imports directs depuis le fichier réel, pas de `index.ts` inutiles ;
- `shared/` est réservé au transverse, jamais au métier ;
- les types et règles métier recettes vivent en `core/domain/recipes.ts`, pas dans `shared/`.

## 9. Noyau métier

### 9.1 Result

```ts
// core/domain/result.ts
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Failure };

export function success<T>(data: T): Result<T> {
  return { success: true, data };
}

export function failure(error: Failure): Result<never> {
  return { success: false, error };
}
```

### 9.2 Failure

```ts
// core/domain/failures.ts
export type FailureCode = 'network' | 'storage' | 'validation' | 'unexpected';

export type Failure = {
  code: FailureCode;
  message: string;
  cause?: unknown;
};
```

### 9.3 Paginated

```ts
// core/domain/paginated.ts
export type Paginated<T> = {
  items: T[];
  total: number;
  skip: number;
  limit: number;
};
```

### 9.4 Modèle métier recettes

```ts
// core/domain/recipes.ts
export type RecipeStatus = 'not_started' | 'in_progress' | 'done';

export type Recipe = {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
};

export type RecipeProgress = {
  recipeId: number;
  completedStepIndexes: number[];
  updatedAt: string;
};

export type RecipeProgressById = Record<number, RecipeProgress>;

export type PaginatedRecipes = Paginated<Recipe>;

export type PaginatedRecipesResult = Result<PaginatedRecipes>;

export type ListRecipesParams = {
  limit: number;
  skip: number;
};

export type SearchRecipesParams = {
  query: string;
  limit: number;
  skip: number;
};

export const computeRecipeStatus = (
  progress: RecipeProgress,
  totalSteps: number,
): RecipeStatus => {
  // ...
};

export const toggleRecipeStep = (
  progress: RecipeProgress,
  stepIndex: number,
): RecipeProgress => {
  // ...
};
```

Décisions :

- **pas de value objects artificiels** du type `RecipeId`, `StepIndex`, etc. ;
- **préférer `type` à `interface`** tant qu'il n'y a pas de classe à implémenter ;
- aucune logique React, réseau ou stockage dans `core/domain/`.

## 10. Use cases retenus

Les use cases vivent dans `core/usecases/`.

Ils :

- prennent des ports en paramètres ;
- retournent des types du domaine ;
- n'importent jamais `fetch`, `AsyncStorage`, React ou Expo.

Use cases du test :

- `hydrateRecipeProgress`
- `listRecipes`
- `searchRecipes`
- `toggleInstructionStep`

Exemples :

```ts
// core/usecases/listRecipes.ts
export const listRecipes = (
  repository: RecipesRepository,
  params: ListRecipesParams,
) => repository.list(params);

// core/usecases/hydrateRecipeProgress.ts
export const hydrateRecipeProgress = (repository: RecipesRepository) =>
  repository.readAllProgress();
```

`listRecipes` couvre à la fois :

- le chargement initial ;
- la pagination au scroll via un `skip` croissant.

## 11. Ports

Les contrats de repository vivent dans `core/ports/`.

```ts
// core/ports/recipesRepository.ts
export type RecipesRepository = {
  list: (params: {
    limit: number;
    skip: number;
  }) => Promise<PaginatedRecipesResult>;
  search: (params: {
    query: string;
    limit: number;
    skip: number;
  }) => Promise<PaginatedRecipesResult>;
  readAllProgress: () => Promise<Result<Record<number, RecipeProgress>>>;
  saveProgress: (progress: RecipeProgress) => Promise<Result<void>>;
};
```

## 12. Infrastructure et presentation

### 12.1 Infrastructure

`infrastructure/` regroupera :

- `http/` pour le client réseau
- `recipes/` pour l'implémentation concrète du repository
- des datasources internes pour DummyJSON et AsyncStorage si nécessaire

Cette couche :

- implémente les ports définis dans `core/ports/`
- importe `core/domain/` et `core/ports/`
- n'importe jamais `presentation/`

### 12.2 Presentation

`presentation/` regroupe :

- `pages/`
- `layout/`
- `providers/`
- `hooks/`
- `components/`

Règles :

- `pages/` orchestrent l'affichage
- `hooks/` appellent les use cases
- `components/` restent UI-only
- `providers/` exposent les dépendances à React
- `layout/` contient l'enveloppe de rendu globale

## 13. Stratégie de persistance

Choix retenu :

- une seule clé de stockage : `recipe_progress_v1`
- format : `Record<number, RecipeProgress>`

Exemple :

```json
{
  "1": {
    "recipeId": 1,
    "completedStepIndexes": [0, 1, 2],
    "updatedAt": "2026-03-16T10:00:00.000Z"
  }
}
```

Pourquoi ce format :

- lecture rapide au démarrage ;
- lookup simple par `recipeId` ;
- pas de surcoût inutile de normalisation.

Comportement en cas d'erreur de lecture :

- on retourne un `Record` vide et on continue le démarrage normalement (progression perdue, non bloquant).

## 14. Flux applicatifs

### 14.1 Startup

1. Garder le splash natif visible.
2. Instancier les dépendances applicatives via `createAppDependencies()`.
3. Exécuter `hydrateRecipeProgress` (AsyncStorage) — en cas d'échec, progression vide.
4. Exécuter `listRecipes({ limit: 5, skip: 0 })`.
5. Si succès : masquer le splash et afficher la liste.
6. Si échec réseau : masquer le splash et afficher l'écran fallback.

> `fr.json` est importé de façon synchrone — ce n'est pas une étape asynchrone du bootstrap.

### 14.2 Liste et pagination

1. L'écran principal affiche les 5 premières recettes.
2. Le scroll déclenche `listRecipes({ skip: items.length })`.
3. Chaque chargement ajoute 5 nouvelles recettes.
4. En cas d'erreur de pagination, on garde les données visibles et on affiche un retry local.

### 14.3 Recherche

1. Le champ de recherche est debouncé à 300 ms.
2. Si la requête est vide, on revient au mode liste.
3. Si la requête est non vide, on appelle `searchRecipes`.
4. Toute nouvelle recherche réinitialise le `skip` à 0.

### 14.4 Détail et progression

1. L'utilisateur ouvre une recette.
2. Le détail s'affiche dans une modal plein écran.
3. Le toggle d'une étape :
   - met à jour l'état React en mémoire (optimiste) ;
   - recalcule le statut via `computeRecipeStatus` ;
   - persiste immédiatement via `toggleInstructionStep`.
4. Si la persistance échoue, l'état est rollback et un message non bloquant s'affiche.
5. Au retour liste, le badge de statut reflète l'état à jour.

## 15. Stratégie d'erreurs

### 15.1 Erreurs bloquantes

Cas concernés :

- premier fetch des recettes impossible au démarrage ;
- erreur inattendue empêchant l'app de devenir utilisable.

Comportement :

- affichage de `StartupFallbackScreen` (plein écran) ;
- message utilisateur clair ;
- bouton `Réessayer`.

### 15.2 Erreurs non bloquantes

Cas concernés :

- lecture AsyncStorage au démarrage (progression ignorée) ;
- échec d'un chargement de page suivante ;
- échec d'une recherche après affichage initial ;
- échec de sauvegarde locale.

Comportement :

- l'utilisateur reste dans son flux courant ;
- affichage d'un message contextualisé ;
- proposition d'une action locale de retry si pertinent.

## 16. États d'interface

Il s'agit bien d'une app **single-page** : "écran" désigne un **état d'interface**, pas une route de navigation.

- `AppRoot` : composition root de l'application
- `InitPage` : état d'initialisation au lancement
- `StartupFallbackPage` : fallback plein écran en cas d'erreur bloquante
- `RecipesPage` : liste + recherche + pagination
- `RecipeDetailModal` : détail recette + progression

## 17. Définition de done

Le test sera considéré comme correctement livré si :

- l'app démarre sur un vrai flux d'initialisation ;
- la liste charge par paquets de 5 ;
- la recherche fonctionne ;
- le détail recette est ouvrable et refermable ;
- les étapes peuvent être cochées ;
- le statut `In Progress` / `Done` est correct ;
- plusieurs recettes peuvent être suivies en parallèle ;
- la progression est retrouvée au redémarrage ;
- les erreurs bloquantes affichent un fallback avec retry ;
- aucun texte UI n'est hardcodé hors du système i18n ;
- les couches respectent les dépendances prévues (`presentation -> core/usecases -> core/ports`, `infrastructure -> core/ports + core/domain`) ;
- les tests essentiels passent.

## 18. Plan d'implémentation recommandé

### Phase 1 - Socle

- créer la structure `src/`
- installer les dépendances retenues
- configurer TypeScript strict, ESLint, Prettier
- mettre en place `Result` / `Failure` / `Paginated` dans `core/`
- mettre en place DI, i18n, thème
- configurer `husky`, `lint-staged`, `pre-commit` et `pre-push`

### Phase 2 - Infra

- implémenter `ApiClient`
- implémenter `DummyJsonRecipesDatasource` + mapper
- implémenter `AsyncStorageProgressDatasource`
- implémenter le `RecipesRepository` concret

### Phase 3 - Feature recettes

- use cases `listRecipes`, `searchRecipes`, `hydrateRecipeProgress`
- `RecipesScreen` : liste + pagination + recherche
- badges de statut

### Phase 4 - Détail et progression

- use case `toggleInstructionStep`
- `RecipeDetailModal` : ingrédients + checkboxes
- persistance immédiate + rollback
- synchronisation liste <-> détail

### Phase 5 - Robustesse

- startup natif + `StartupFallbackScreen`
- tests clés (use cases, services domaine, hooks)
- README de livraison

## 19. Références techniques utiles

- DummyJSON Recipes docs : https://dummyjson.com/docs/recipes
- Expo Splash Screen : https://docs.expo.dev/versions/latest/sdk/splash-screen/
- Expo Image : https://docs.expo.dev/versions/latest/sdk/image/
- Safe Areas : https://docs.expo.dev/develop/user-interface/safe-areas/
- AsyncStorage Expo : https://docs.expo.dev/versions/latest/sdk/async-storage/
- AsyncStorage official docs : https://react-native-async-storage.github.io/async-storage/docs/install/
- Expo unit testing with Jest : https://docs.expo.dev/develop/unit-testing/
- React Native Testing Library : https://callstack.github.io/react-native-testing-library/docs/start/intro

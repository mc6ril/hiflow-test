import type { ComponentProps, ReactNode } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppDependencies } from '@/app/createAppDependencies';
import { createFailure, failure, success } from '@/core/domain/result';
import type { Recipe } from '@/core/domain/recipes';
import type { RecipesRepository } from '@/core/ports/recipesRepository';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { RecipesPage } from '@/presentation/pages/recipes';
import { AppDependenciesProvider } from '@/presentation/providers/AppDependenciesProvider';
import { createI18n } from '@/shared/i18n/createI18n';
import { appTheme } from '@/shared/theme/appTheme';

jest.mock('react-native-safe-area-context', () => {
  const { View } = jest.requireActual('react-native');

  return {
    SafeAreaProvider: ({ children }: { children: ReactNode }) => (
      <View>{children}</View>
    ),
    SafeAreaView: ({ children }: { children: ReactNode }) => (
      <View>{children}</View>
    ),
  };
});

const createRecipe = (id: number, name = `Recipe ${id}`): Recipe =>
  Object.freeze({
    id,
    name,
    image: `https://example.com/recipes/${id}.jpg`,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'Easy',
    cuisine: 'French',
    rating: 4.5,
    ingredients: ['Ingredient'],
    instructions: ['Step 1', 'Step 2'],
  });

const createRecipes = (count: number, startId = 1): Recipe[] =>
  Array.from({ length: count }, (_, index) => createRecipe(startId + index));

const createSnapshot = (
  items: Recipe[],
  total = items.length,
): AppStartupSnapshot =>
  Object.freeze({
    progressById: {},
    recipesPage: Object.freeze({
      items,
      total,
      skip: 0,
      limit: 5,
    }),
  });

const createRepository = (): jest.Mocked<RecipesRepository> => ({
  list: jest.fn(),
  search: jest.fn(),
  readAllProgress: jest.fn(),
  saveProgress: jest.fn(),
});

const renderRecipesPage = (
  repository: jest.Mocked<RecipesRepository>,
  snapshot: AppStartupSnapshot,
) => {
  const dependencies: AppDependencies = {
    i18n: createI18n(),
    theme: appTheme,
    recipesRepository: repository,
    startup: Object.freeze({
      initialRecipesPageSize: 5,
    }),
  };

  return render(
    <AppDependenciesProvider dependencies={dependencies}>
      <SafeAreaProvider>
        <RecipesPage snapshot={snapshot} />
      </SafeAreaProvider>
    </AppDependenciesProvider>,
  );
};

const createDeferred = <T,>() => {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((innerResolve) => {
    resolve = innerResolve;
  });

  return { promise, resolve };
};

const triggerPagination = (list: ComponentProps<typeof FlatList>) => {
  act(() => {
    list.onScroll?.({
      nativeEvent: {
        contentOffset: {
          x: 0,
          y: 280,
        },
        contentSize: {
          height: 1000,
          width: 390,
        },
        layoutMeasurement: {
          height: 700,
          width: 390,
        },
      },
    } as never);
  });
};

describe('RecipesPage', () => {
  it('renders the first five recipes from startup', () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 12);
    const screen = renderRecipesPage(repository, snapshot);

    expect(screen.getByText('Recipe 1')).toBeTruthy();
    expect(screen.getByText('Recipe 5')).toBeTruthy();
    expect(screen.queryByText('Recipe 6')).toBeNull();
  });

  it('loads the next page on scroll with skip equal to the current items length', async () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 10);
    const deferredResult =
      createDeferred<Awaited<ReturnType<RecipesRepository['list']>>>();

    repository.list.mockReturnValueOnce(
      deferredResult.promise as ReturnType<RecipesRepository['list']>,
    );

    const screen = renderRecipesPage(repository, snapshot);
    const list = screen.getByTestId('recipes-list').props as ComponentProps<
      typeof FlatList
    >;

    triggerPagination(list);

    await waitFor(() => {
      expect(repository.list).toHaveBeenCalledWith({
        limit: 5,
        skip: 5,
      });
    });

    expect(
      screen.getByText('Chargement de nouvelles recettes...'),
    ).toBeTruthy();

    deferredResult.resolve(
      success({
        items: createRecipes(5, 6),
        total: 10,
        skip: 5,
        limit: 5,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('Recipe 10')).toBeTruthy();
    });

    expect(
      screen.queryByText('Chargement de nouvelles recettes...'),
    ).toBeNull();
  });

  it('keeps loaded recipes visible and exposes a local retry when pagination fails', async () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 10);

    repository.list
      .mockResolvedValueOnce(
        failure(createFailure('network', 'network unavailable')),
      )
      .mockResolvedValueOnce(
        success({
          items: createRecipes(5, 6),
          total: 10,
          skip: 5,
          limit: 5,
        }),
      );

    const screen = renderRecipesPage(repository, snapshot);
    const list = screen.getByTestId('recipes-list').props as ComponentProps<
      typeof FlatList
    >;

    triggerPagination(list);

    await waitFor(() => {
      expect(
        screen.getByText('Impossible de charger plus de recettes.'),
      ).toBeTruthy();
    });

    expect(screen.getByText('Recipe 5')).toBeTruthy();
    expect(screen.queryByText('Recipe 6')).toBeNull();

    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => {
      expect(repository.list).toHaveBeenNthCalledWith(2, {
        limit: 5,
        skip: 5,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Recipe 10')).toBeTruthy();
    });

    expect(
      screen.queryByText('Impossible de charger plus de recettes.'),
    ).toBeNull();
  });

  it('searches recipes and replaces the visible list with matching results', async () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 12);

    repository.search.mockResolvedValueOnce(
      success({
        items: [createRecipe(42, 'Pizza Primavera')],
        total: 1,
        skip: 0,
        limit: 5,
      }),
    );

    const screen = renderRecipesPage(repository, snapshot);

    fireEvent.changeText(screen.getByTestId('recipes-search-input'), 'Pizza');

    await waitFor(() => {
      expect(repository.search).toHaveBeenCalledWith({
        query: 'Pizza',
        limit: 5,
        skip: 0,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Pizza Primavera')).toBeTruthy();
    });

    expect(screen.queryByText('Recipe 1')).toBeNull();
    expect(screen.queryByText('Recipe 5')).toBeNull();
  });

  it('loads the next page with the active search query when the list is filtered', async () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 12);

    repository.search
      .mockResolvedValueOnce(
        success({
          items: createRecipes(5, 20),
          total: 8,
          skip: 0,
          limit: 5,
        }),
      )
      .mockResolvedValueOnce(
        success({
          items: createRecipes(3, 25),
          total: 8,
          skip: 5,
          limit: 5,
        }),
      );

    const screen = renderRecipesPage(repository, snapshot);

    fireEvent.changeText(screen.getByTestId('recipes-search-input'), 'Soup');

    await waitFor(() => {
      expect(repository.search).toHaveBeenNthCalledWith(1, {
        query: 'Soup',
        limit: 5,
        skip: 0,
      });
    });

    const list = screen.getByTestId('recipes-list').props as ComponentProps<
      typeof FlatList
    >;

    triggerPagination(list);

    await waitFor(() => {
      expect(repository.search).toHaveBeenNthCalledWith(2, {
        query: 'Soup',
        limit: 5,
        skip: 5,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Recipe 27')).toBeTruthy();
    });
  });

  it('restores the locally loaded list when the search query is cleared', async () => {
    const repository = createRepository();
    const snapshot = createSnapshot(createRecipes(5), 12);

    repository.search.mockResolvedValueOnce(
      success({
        items: [createRecipe(77, 'Veloute de champignons')],
        total: 1,
        skip: 0,
        limit: 5,
      }),
    );

    const screen = renderRecipesPage(repository, snapshot);
    const searchInput = screen.getByTestId('recipes-search-input');

    fireEvent.changeText(searchInput, 'Soupe');

    await waitFor(() => {
      expect(screen.getByText('Veloute de champignons')).toBeTruthy();
    });

    fireEvent.changeText(searchInput, '');

    await waitFor(() => {
      expect(screen.getByText('Recipe 1')).toBeTruthy();
    });

    expect(screen.queryByText('Veloute de champignons')).toBeNull();
    expect(repository.list).not.toHaveBeenCalled();
  });
});

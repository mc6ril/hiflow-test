import type { ComponentProps, ReactNode } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppDependencies } from '@/app/createAppDependencies';
import { createFailure } from '@/core/domain/failures';
import { failure, success } from '@/core/domain/result';
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

const createRecipe = (id: number): Recipe =>
  Object.freeze({
    id,
    name: `Recipe ${id}`,
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
});

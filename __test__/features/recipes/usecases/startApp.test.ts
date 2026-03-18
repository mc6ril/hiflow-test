import type { RecipesRepository } from '@/features/recipes/domain/recipesRepository';
import { startApp } from '@/features/recipes/usecases/startApp';
import { createFailure, failure, success } from '@/shared/domain/result';

describe('startApp', () => {
  const createRepository = (): jest.Mocked<RecipesRepository> => ({
    list: jest.fn(),
    search: jest.fn(),
    readAllProgress: jest.fn(),
    saveProgress: jest.fn(),
  });

  it('keeps startup successful when local progress hydration fails', async () => {
    const repository = createRepository();

    repository.readAllProgress.mockResolvedValue(
      failure(createFailure('storage', 'storage unavailable')),
    );
    repository.list.mockResolvedValue(
      success({
        items: [],
        total: 0,
        skip: 0,
        limit: 5,
      }),
    );

    const result = await startApp(repository, {
      limit: 5,
      skip: 0,
    });

    expect(result).toEqual({
      success: true,
      data: {
        progressById: {},
        recipesPage: {
          items: [],
          total: 0,
          skip: 0,
          limit: 5,
        },
      },
    });
  });

  it('returns the blocking recipes error when the first page cannot load', async () => {
    const repository = createRepository();

    repository.readAllProgress.mockResolvedValue(success({}));
    repository.list.mockResolvedValue(
      failure(createFailure('network', 'network unavailable')),
    );

    const result = await startApp(repository, {
      limit: 5,
      skip: 0,
    });

    expect(result).toEqual({
      success: false,
      error: {
        code: 'network',
        message: 'network unavailable',
      },
    });
  });
});

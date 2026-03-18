import AsyncStorage from '@react-native-async-storage/async-storage';

import { createRecipesRepository } from '@/features/recipes/infrastructure/RecipesRepository';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

const mockedAsyncStorage = jest.mocked(AsyncStorage);
const originalFetch = global.fetch;

const createRecipesPayload = () => ({
  limit: 5,
  recipes: [
    {
      cookTimeMinutes: 20,
      cuisine: 'French',
      difficulty: 'Easy',
      id: 1,
      image: 'https://example.com/recipes/1.jpg',
      ingredients: ['Salt'],
      instructions: ['Mix'],
      name: 'Soup',
      prepTimeMinutes: 10,
      rating: 4.5,
    },
  ],
  skip: 0,
  total: 1,
});

describe('createRecipesRepository', () => {
  beforeEach(() => {
    mockedAsyncStorage.getItem.mockReset();
    mockedAsyncStorage.setItem.mockReset();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('lists recipes with the expected API URL and parses the payload', async () => {
    const repository = createRecipesRepository();

    jest.mocked(global.fetch).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(createRecipesPayload()),
      ok: true,
    } as unknown as Response);

    const result = await repository.list({
      limit: 5,
      skip: 0,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/recipes?limit=5&skip=0',
      {
        signal: null,
      },
    );
    expect(result).toEqual({
      data: {
        items: [
          {
            cookTimeMinutes: 20,
            cuisine: 'French',
            difficulty: 'Easy',
            id: 1,
            image: 'https://example.com/recipes/1.jpg',
            ingredients: ['Salt'],
            instructions: ['Mix'],
            name: 'Soup',
            prepTimeMinutes: 10,
            rating: 4.5,
          },
        ],
        limit: 5,
        skip: 0,
        total: 1,
      },
      success: true,
    });
  });

  it('searches recipes with the active query and forwards the abort signal', async () => {
    const repository = createRecipesRepository();
    const abortController = new AbortController();

    jest.mocked(global.fetch).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(createRecipesPayload()),
      ok: true,
    } as unknown as Response);

    await repository.search(
      {
        limit: 5,
        query: 'Soup',
        skip: 0,
      },
      {
        signal: abortController.signal,
      },
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/recipes/search?limit=5&skip=0&q=Soup',
      {
        signal: abortController.signal,
      },
    );
  });

  it('returns a validation failure when the API payload is malformed', async () => {
    const repository = createRecipesRepository();

    jest.mocked(global.fetch).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        limit: 5,
        recipes: [
          {
            id: 1,
            name: 'Soup',
          },
        ],
        skip: 0,
        total: 1,
      }),
      ok: true,
    } as unknown as Response);

    const result = await repository.list({
      limit: 5,
      skip: 0,
    });

    expect(result).toEqual({
      error: expect.objectContaining({
        code: 'validation',
      }),
      success: false,
    });
  });

  it('returns a network failure when the API responds with a non-ok status', async () => {
    const repository = createRecipesRepository();

    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    const result = await repository.list({
      limit: 5,
      skip: 0,
    });

    expect(result).toEqual({
      error: expect.objectContaining({
        code: 'network',
      }),
      success: false,
    });
  });
});

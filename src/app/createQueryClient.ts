import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

export const createQueryClient = (defaultOptions: DefaultOptions = {}) => {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
        ...defaultOptions.mutations,
      },
      queries: {
        retry: false,
        ...defaultOptions.queries,
      },
    },
  });
};

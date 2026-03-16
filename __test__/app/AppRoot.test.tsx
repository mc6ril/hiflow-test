import { render } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { AppRoot } from '@/app/AppRoot';
import { createAppDependencies } from '@/app/createAppDependencies';

jest.mock('@/app/createAppDependencies', () => ({
  createAppDependencies: jest.fn(() => ({
    i18n: {
      locale: 'fr',
      t: (key: string) => key,
    },
    theme: {},
  })),
}));

jest.mock('@/presentation/layout', () => {
  const { Fragment } = jest.requireActual<typeof import('react')>('react');

  return {
    AppLayout: ({ children }: { children: ReactNode }) => (
      <Fragment>{children}</Fragment>
    ),
  };
});

jest.mock('@/presentation/pages/bootstrap', () => ({
  BootstrapPage: () => null,
}));

describe('AppRoot', () => {
  const createAppDependenciesMock = jest.mocked(createAppDependencies);

  beforeEach(() => {
    createAppDependenciesMock.mockClear();
  });

  it('creates app dependencies only once across re-renders', () => {
    const { rerender } = render(<AppRoot />);

    expect(createAppDependenciesMock).toHaveBeenCalledTimes(1);

    rerender(<AppRoot />);

    expect(createAppDependenciesMock).toHaveBeenCalledTimes(1);
  });
});

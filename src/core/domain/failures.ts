export type FailureCode = 'network' | 'storage' | 'validation' | 'unexpected';

export type Failure = {
  code: FailureCode;
  message: string;
  cause?: unknown;
};

export const createFailure = (
  code: FailureCode,
  message: string,
  cause?: unknown,
): Failure =>
  Object.freeze({
    code,
    message,
    cause,
  });

export const unexpectedFailure = (
  message = 'An unexpected error occurred.',
  cause?: unknown,
): Failure => createFailure('unexpected', message, cause);

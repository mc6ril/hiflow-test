export type FailureCode =
  | 'aborted'
  | 'network'
  | 'storage'
  | 'validation'
  | 'unexpected';

export type Failure = {
  code: FailureCode;
  message: string;
  cause?: unknown;
};

export const createFailure = (
  code: FailureCode,
  message: string,
  cause?: unknown,
): Failure => {
  return Object.freeze({
    code,
    message,
    cause,
  });
};

export const unexpectedFailure = (
  message = 'An unexpected error occurred.',
  cause?: unknown,
): Failure => {
  return createFailure('unexpected', message, cause);
};

export type FailureResult = {
  success: false;
  error: Failure;
};

export const failure = (error: Failure): FailureResult => {
  return Object.freeze({
    success: false,
    error,
  });
};

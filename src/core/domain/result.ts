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

export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Failure;
    };

export const success = <T>(data: T): Result<T> =>
  Object.freeze({
    success: true,
    data,
  });

// `never` keeps the failure branch assignable to any `Result<T>`.
export const failure = (error: Failure): Result<never> =>
  Object.freeze({
    success: false,
    error,
  });

export const isSuccess = <T>(
  result: Result<T>,
): result is { success: true; data: T } => result.success;

export const isFailure = (
  result: Result<unknown>,
): result is { success: false; error: Failure } => !result.success;

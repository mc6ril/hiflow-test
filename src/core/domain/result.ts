import type { Failure } from '@/core/domain/failures';

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

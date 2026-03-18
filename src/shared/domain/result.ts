import type { FailureResult } from '@/shared/domain/failure';
import type { SuccessResult } from '@/shared/domain/success';
export { createFailure, failure } from '@/shared/domain/failure';
export { success } from '@/shared/domain/success';

export type Result<DataType> = SuccessResult<DataType> | FailureResult;

export const isSuccess = <DataType>(
  result: Result<DataType>,
): result is SuccessResult<DataType> => {
  return result.success;
};

export const isFailure = <DataType>(
  result: Result<DataType>,
): result is FailureResult => {
  return !result.success;
};

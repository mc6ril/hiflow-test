export type SuccessResult<DataType> = {
  success: true;
  data: DataType;
};

export const success = <DataType>(data: DataType): SuccessResult<DataType> => {
  return Object.freeze({
    success: true,
    data,
  });
};

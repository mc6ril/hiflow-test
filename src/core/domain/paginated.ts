export type Paginated<T> = {
  items: T[];
  total: number;
  skip: number;
  limit: number;
};

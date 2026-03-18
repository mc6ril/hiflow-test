export type Paginated<ItemType> = {
  items: ItemType[];
  total: number;
  skip: number;
  limit: number;
};

import lodash from 'lodash';

/**
 * Checks if the value is a JSON record.
 * @param value - The value to check.
 * @returns True if the value is a JSON record, false otherwise.
 */
export const isJsonRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return lodash.isPlainObject(value);
};

/**
 * Checks if the value is a number.
 * @param value - The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export const isNumber = (value: unknown): value is number => {
  return lodash.isFinite(value);
};

/**
 * Checks if the value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): value is string => {
  return lodash.isString(value);
};

/**
 * Checks if the value is an array of items.
 * @param value - The value to check.
 * @param predicate - The predicate to check each item.
 * @returns True if the value is an array of items, false otherwise.
 */
export const isArrayOf = <Item>(
  value: unknown,
  predicate: (candidate: unknown) => candidate is Item,
): value is Item[] => {
  return lodash.isArray(value) && lodash.every(value, predicate);
};

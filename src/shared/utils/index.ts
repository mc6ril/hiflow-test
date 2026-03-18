const hasPlainObjectPrototype = (value: object) => {
  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};

/**
 * Checks if the value is a JSON record.
 * @param value - The value to check.
 * @returns True if the value is a JSON record, false otherwise.
 */
export const isJsonRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    hasPlainObjectPrototype(value)
  );
};

/**
 * Checks if the value is a number.
 * @param value - The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export const isNumber = (value: unknown): value is number => {
  return (
    typeof value === 'number' && Number.isFinite(value) && !Number.isNaN(value)
  );
};

/**
 * Checks if the value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
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
  return Array.isArray(value) && value.every(predicate);
};

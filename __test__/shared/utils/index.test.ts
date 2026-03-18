const loadUtils = () => {
  jest.resetModules();

  return jest.requireActual(
    '@/shared/utils',
  ) as typeof import('@/shared/utils');
};

describe('shared utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('isJsonRecord', () => {
    it('returns true for plain objects and null-prototype objects', () => {
      const utils = loadUtils();

      expect(utils.isJsonRecord({ key: 'value' })).toBe(true);
      expect(utils.isJsonRecord(Object.create(null))).toBe(true);
    });

    it('returns false for arrays, null and class instances', () => {
      const utils = loadUtils();

      expect(utils.isJsonRecord(['value'])).toBe(false);
      expect(utils.isJsonRecord(null)).toBe(false);
      expect(utils.isJsonRecord(new Date())).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('returns true only for finite numbers', () => {
      const utils = loadUtils();

      expect(utils.isNumber(42)).toBe(true);
      expect(utils.isNumber(3.14)).toBe(true);
      expect(utils.isNumber(Infinity)).toBe(false);
      expect(utils.isNumber(NaN)).toBe(false);
      expect(utils.isNumber('42')).toBe(false);
    });
  });

  describe('isString', () => {
    it('returns true only for strings', () => {
      const utils = loadUtils();

      expect(utils.isString('hello')).toBe(true);
      expect(utils.isString(123)).toBe(false);
      expect(utils.isString(false)).toBe(false);
    });
  });

  describe('isArrayOf', () => {
    it('returns true when every item matches predicate', () => {
      const utils = loadUtils();

      expect(utils.isArrayOf(['a', 'b'], utils.isString)).toBe(true);
    });

    it('returns false for non-arrays and mixed arrays', () => {
      const utils = loadUtils();

      expect(utils.isArrayOf('not-an-array', utils.isString)).toBe(false);
      expect(utils.isArrayOf(['a', 2], utils.isString)).toBe(false);
    });
  });
});

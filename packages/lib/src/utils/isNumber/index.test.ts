import { isNumber } from '@utils';

describe('isNumber', () => {
  it('CASE-1', () => {
    expect(isNumber(1)).toBe(true);
  });

  it('CASE-2', () => {
    expect(isNumber('1')).toBe(true);
  });

  it('CASE-3', () => {
    expect(isNumber(1.1)).toBe(true);
  });

  it('CASE-4', () => {
    expect(isNumber('1.1')).toBe(true);
  });

  it('CASE-5', () => {
    expect(isNumber('')).toBe(false);
  });

  it('CASE-6', () => {
    expect(isNumber(null)).toBe(false);
  });

  it('CASE-7', () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it('CASE-8', () => {
    expect(isNumber('1.1a')).toBe(false);
  });

  it('CASE-9', () => {
    expect(isNumber(-1)).toBe(true);
  });

  it('CASE-10', () => {
    expect(isNumber(-1.1)).toBe(true);
  });

  it('CASE-11', () => {
    expect(isNumber('-1')).toBe(true);
  });

  it('CASE-12', () => {
    expect(isNumber('-1.1')).toBe(true);
  });

  it('CASE-13', () => {
    expect(isNumber(2e64)).toBe(true);
  });

  it('CASE-14', () => {
    expect(isNumber('2e64')).toBe(true);
  });

  it('CASE-15', () => {
    expect(isNumber('0')).toBe(true);
  });

  it('CASE-16', () => {
    expect(isNumber(0)).toBe(true);
  });
});

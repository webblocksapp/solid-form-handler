import { isInteger } from '@utils';

describe('isInteger', () => {
  it('CASE-1', () => {
    expect(isInteger(1)).toBe(true);
  });

  it('CASE-2', () => {
    expect(isInteger('1')).toBe(true);
  });

  it('CASE-3', () => {
    expect(isInteger(1.1)).toBe(false);
  });

  it('CASE-4', () => {
    expect(isInteger('1.1')).toBe(false);
  });

  it('CASE-5', () => {
    expect(isInteger('')).toBe(false);
  });

  it('CASE-6', () => {
    expect(isInteger(null)).toBe(false);
  });

  it('CASE-7', () => {
    expect(isInteger(undefined)).toBe(false);
  });

  it('CASE-8', () => {
    expect(isInteger('1.1a')).toBe(false);
  });

  it('CASE-9', () => {
    expect(isInteger(-1)).toBe(true);
  });

  it('CASE-10', () => {
    expect(isInteger(-1.1)).toBe(false);
  });

  it('CASE-11', () => {
    expect(isInteger('-1')).toBe(true);
  });

  it('CASE-12', () => {
    expect(isInteger('-1.1')).toBe(false);
  });

  it('CASE-13', () => {
    expect(isInteger(2e64)).toBe(false);
  });

  it('CASE-14', () => {
    expect(isInteger('2e64')).toBe(false);
  });

  it('CASE-15', () => {
    expect(isInteger('0')).toBe(true);
  });

  it('CASE-16', () => {
    expect(isInteger(0)).toBe(true);
  });
});

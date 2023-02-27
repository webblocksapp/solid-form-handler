import { isEmpty } from '@utils';

describe('isEmpty', () => {
  it('CASE-1', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('CASE-2', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('CASE-3', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('CASE-4', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('CASE-5', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('CASE-6', () => {
    expect(isEmpty([undefined, undefined])).toBe(true);
  });

  it('CASE-7', () => {
    expect(isEmpty(['', ''])).toBe(true);
  });

  it('CASE-8', () => {
    expect(isEmpty([{ name: '', age: '' }])).toBe(true);
  });

  it('CASE-9', () => {
    expect(isEmpty({ name: '', age: '' })).toBe(true);
  });

  it('CASE-10', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('CASE-11', () => {
    expect(isEmpty(111)).toBe(false);
  });

  it('CASE-12', () => {
    expect(isEmpty([{ name: 'Laura', age: '' }])).toBe(false);
  });

  it('CASE-13', () => {
    expect(isEmpty({ name: 'Laura', age: '' })).toBe(false);
  });
});

import { objectValueExists } from '@utils';

describe('isNumber', () => {
  it('CASE-1', () => {
    expect(objectValueExists([], '0')).toBe(false);
  });

  it('CASE-2', () => {
    expect(objectValueExists(['Hi'], '0')).toBe(true);
  });

  it('CASE-3', () => {
    expect(objectValueExists([{ greet: 'Hi' }], '0.greet')).toBe(true);
  });

  it('CASE-4', () => {
    expect(objectValueExists({ greet: 'Hi' }, 'greet')).toBe(true);
  });

  it('CASE-5', () => {
    expect(objectValueExists({ greet: '' }, 'greet')).toBe(true);
  });

  it('CASE-6', () => {
    expect(objectValueExists({ greet: '' }, 'anyKey')).toBe(false);
  });
});

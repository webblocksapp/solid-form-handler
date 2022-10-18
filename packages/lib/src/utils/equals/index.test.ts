import { equals } from '@utils';

describe('equals', () => {
  it('CASE-1', () => {
    expect(equals(1, 1)).toBe(true);
  });

  it('CASE-2', () => {
    expect(equals(1, 2)).toBe(false);
  });

  it('CASE-3', () => {
    expect(equals(1, '1')).toBe(false);
  });

  it('CASE-4', () => {
    expect(equals([], [])).toBe(true);
  });

  it('CASE-5', () => {
    expect(equals({}, {})).toBe(true);
  });

  it('CASE-6', () => {
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('CASE-7', () => {
    expect(equals([1, 2, 3], [1, 2])).toBe(false);
  });

  it('CASE-8', () => {
    expect(equals([1, 2, 3], [1, 2, '3'])).toBe(false);
  });

  it('CASE-9', () => {
    expect(equals({ name: 'John' }, { name: 'John' })).toBe(true);
  });

  it('CASE-10', () => {
    expect(equals({ name: 'John' }, { name: 'Laura' })).toBe(false);
  });

  it('CASE-10', () => {
    expect(equals([{ name: 'John' }], [{ name: 'John' }])).toBe(true);
  });

  it('CASE-11', () => {
    expect(equals({ contact: { phone: '111111' } }, { contact: { phone: '111111', email: 'test@mail.com' } })).toBe(
      false
    );
  });

  it('CASE-12', () => {
    expect(
      equals(
        { contact: { phone: '111111', email: 'test@mail.com' } },
        { contact: { phone: '111111', email: 'test@mail.com' } }
      )
    ).toBe(true);
  });

  it('CASE-13', () => {
    expect(
      equals(
        { contact: { phone: '111111', email: ['test@mail.com'] } },
        { contact: { phone: '111111', email: 'test@mail.com' } }
      )
    ).toBe(false);
  });
});

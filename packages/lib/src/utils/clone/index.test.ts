import { clone } from '@utils';

describe('clone', () => {
  it('CASE-1', () => {
    expect(clone({})).toMatchObject({});
  });

  it('CASE-2', () => {
    expect(clone([])).toMatchObject([]);
  });

  it('CASE-3', () => {
    expect(clone('')).toBe('');
  });

  it('CASE-4', () => {
    expect(clone(100)).toBe(100);
  });

  it('CASE-5', () => {
    expect([{ name: 'Laura' }]).toMatchObject([{ name: 'Laura' }]);
  });

  it('CASE-6', () => {
    expect({ name: 'Laura' }).toMatchObject({ name: 'Laura' });
  });

  it('CASE-7', () => {
    expect({ contacts: [{ phone: 111 }] }).toMatchObject({ contacts: [{ phone: 111 }] });
  });
});

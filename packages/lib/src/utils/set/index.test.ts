import { set } from '@utils';

describe('set', () => {
  it('CASE-1', () => {
    expect(set({}, 'name', 'Laura')).toMatchObject({ name: 'Laura' });
  });

  it('CASE-2', () => {
    expect(set({}, 'contacts', [])).toMatchObject({ contacts: [] });
  });

  it('CASE-3', () => {
    expect(set([{ name: 'John' }], '0.name', 'Laura')).toMatchObject([{ name: 'Laura' }]);
  });

  it('CASE-4', () => {
    expect(set([{ names: ['John', 'Gabriela'] }], '0.names.1', 'Laura')).toMatchObject([{ names: ['John', 'Laura'] }]);
  });

  it('CASE-5', () => {
    expect(set({}, 'data.name', 'Laura')).toMatchObject({ data: { name: 'Laura' } });
  });

  it('CASE-6', () => {
    expect(set([], '0.name', { isValid: false })).toMatchObject([{ name: { isValid: false } }]);
  });

  it('CASE-7', () => {
    expect(set(undefined, '0.name', { isValid: false })).toMatchObject([{ name: { isValid: false } }]);
  });

  it('CASE-8', () => {
    expect(set(undefined, 'name.0', { isValid: false })).toMatchObject({ name: [{ isValid: false }] });
  });
});

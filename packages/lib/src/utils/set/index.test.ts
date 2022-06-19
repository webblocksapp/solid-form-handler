import { set } from '@utils';

describe('set', () => {
  it('should set the value on nested path', () => {
    expect(set({}, 'name', 'Laura')).toMatchObject({ name: 'Laura' });
    expect(set({}, 'contacts', [])).toMatchObject({ contacts: [] });
    expect(set([{ name: 'John' }], '0.name', 'Laura')).toMatchObject([{ name: 'Laura' }]);
    expect(set([{ names: ['John', 'Gabriela'] }], '0.names.1', 'Laura')).toMatchObject([{ names: ['John', 'Laura'] }]);
  });
});

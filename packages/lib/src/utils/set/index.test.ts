import { set } from '@utils';

describe('set', () => {
  it('sets a nested value from an object', () => {
    const obj1 = {
      name: 'John',
      contact: { email: 'test@email.com', phone: 7272727 },
      companies: [{ name: 'Apple' }, { name: 'Netflix' }],
      info: {
        address: 'Street 123',
      },
    };

    set(obj1, 'test@yahoo.com', 'contact.email');
    set(obj1, 'Amazon', 'companies[0].name');
    set(obj1, { address: 'Street 456' }, 'info');

    expect(obj1).toMatchObject({
      name: 'John',
      contact: { email: 'test@yahoo.com', phone: 7272727 },
      companies: [{ name: 'Amazon' }, { name: 'Netflix' }],
      info: {
        address: 'Street 456',
      },
    });
  });
});

import { createStore } from '@utils';

describe('createStore', () => {
  it('CASE-1', () => {
    const [store, setStore] = createStore({});
    setStore('key1', 1);
    expect(store).toMatchObject({ key1: 1 });
  });

  it('CASE-2', () => {
    const [store, setStore] = createStore({});
    setStore('key1.key2.key3', 1);
    expect(store).toMatchObject({ key1: { key2: { key3: 1 } } });
  });

  it('CASE-3', () => {
    const [store, setStore] = createStore({ data: [{ name: 'Laura' }] });
    setStore('data.1', { name: 'John' });
    expect(store).toMatchObject({ data: [{ name: 'Laura' }, { name: 'John' }] });
  });

  it('CASE-4', () => {
    const [store, setStore] = createStore({ data: [{ name: 'Laura' }] });
    setStore('data.1.0.state', 'John');
    expect(store).toMatchObject({ data: [{ name: 'Laura' }, [{ state: 'John' }]] });
  });

  it('CASE-5', () => {
    const [store, setStore] = createStore([]);
    setStore('0.name', 'John');
    expect(store).toMatchObject([{ name: 'John' }]);
  });

  it('CASE-6', () => {
    const [store, setStore] = createStore([]);
    setStore('0.person.phones.0', 1112211);
    expect(store).toMatchObject([{ person: { phones: [1112211] } }]);
  });
});

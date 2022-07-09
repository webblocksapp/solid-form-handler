import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

export const StoreImpl: Component = () => {
  const [store1, setStore1] = createStore({ data: { name: '', age: 0 } });
  const [store2, setStore2] = createStore({ data: [{ name: '', age: 0 }] });
  const [store3, setStore3] = createStore([{ name: '', age: 0 }]);

  const data1 = store1.data;
  const data2 = () => store2.data;
  const data3 = store3;

  const updateStore1 = () => {
    setStore1('data', { name: 'John', age: 28 });
  };

  const updateStore2 = () => {
    setStore2('data', [
      { name: 'John', age: 28 },
      { name: 'Mary', age: 53 },
    ]);
  };

  const updateStore3 = () => {
    setStore3([
      { name: 'John', age: 28 },
      { name: 'Mary', age: 53 },
    ]);
  };

  return (
    <div>
      <div>
        {/*When clicking Update store 1, data 1 changes are reflected*/}
        <button onClick={updateStore1}>Update store 1</button>
        <pre>
          <code>{JSON.stringify(data1, null, 2)}</code>
        </pre>
      </div>
      <div>
        {/*When clicking Update store 2, data 2 doesn't change*/}
        <button onClick={updateStore2}>Update store 2</button>
        <pre>
          <code>{JSON.stringify(data2(), null, 2)}</code>
        </pre>
      </div>
      <div>
        {/*When clicking Update store 3, data 3 changes are reflected*/}
        <button onClick={updateStore3}>Update store 3</button>
        <pre>
          <code>{JSON.stringify(data3, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

import { BaseFieldStore } from '@interfaces';
import { FieldProps } from '@lib-components';
import { Component, createContext, useContext } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';

const FieldContext = createContext({ baseStore: { props: {}, helpers: {} } } as {
  baseStore: BaseFieldStore;
  setBaseStore: SetStoreFunction<BaseFieldStore>;
});
export const useFieldContext = () => useContext(FieldContext);

export const withFieldProvider = (BaseComponent: Component<FieldProps>) => {
  return (props: FieldProps) => {
    const [baseStore, setBaseStore] = createStore<BaseFieldStore>({
      props: { id: '', name: '', value: '' },
      helpers: { error: false, errorMessage: '', onValueChange: () => {} },
    });

    return (
      <FieldContext.Provider value={{ baseStore, setBaseStore }}>
        <BaseComponent {...props} />
      </FieldContext.Provider>
    );
  };
};

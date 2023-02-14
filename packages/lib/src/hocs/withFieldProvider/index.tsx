import { FieldStore } from '@interfaces';
import { FieldComponentProps } from '@lib-components';
import { Component, createContext, useContext } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';

const FieldContext = createContext(
  {} as {
    baseStore: FieldStore;
    setBaseStore: SetStoreFunction<FieldStore>;
  }
);
export const useFieldContext = () => useContext(FieldContext);

export const withFieldProvider = (BaseComponent: Component<FieldComponentProps>) => {
  return (props: FieldComponentProps) => {
    const [baseStore, setBaseStore] = createStore<FieldStore>({
      props: { id: '', name: '', value: '' },
      helpers: { error: false, errorMessage: '', onValueChange: () => {}, onFieldBlur: () => {} },
    });

    return (
      <FieldContext.Provider value={{ baseStore, setBaseStore }}>
        <BaseComponent {...props} />
      </FieldContext.Provider>
    );
  };
};

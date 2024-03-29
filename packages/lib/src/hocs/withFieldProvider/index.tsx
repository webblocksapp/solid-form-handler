import { FieldStore } from '@interfaces';
import { FieldComponentProps } from '@components';
import { Component, createContext, useContext } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';

const FieldContext = createContext(
  {} as {
    baseStore: FieldStore;
    setBaseStore: SetStoreFunction<FieldStore>;
  }
);
export const useFieldContext = () => useContext(FieldContext);

export const withFieldProvider = <T extends FieldComponentProps>(BaseComponent: Component<T>) => {
  return (props: T) => {
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

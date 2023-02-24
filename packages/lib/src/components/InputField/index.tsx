import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type InputFieldPropKey = keyof InputFieldStore['props'];
type InputFieldStore = Omit<FieldStore, 'props'> & {
  props: FieldStore['props'] & {
    onInput?: CommonEvent;
  };
  helpers: FieldStore['helpers'] & {
    getPropsExcept: (keys: InputFieldPropKey[]) => Pick<InputFieldStore['props'], InputFieldPropKey>;
    matches: (value: any) => boolean;
  };
};

export type InputFieldProps = CommonFieldProps & {
  mode: 'input';
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
  render: (field: InputFieldStore) => JSXElement;
};

export const InputField: Component<InputFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Extended onInput event.
   */
  const onInput: InputFieldProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    baseStore.helpers.onValueChange(
      event.currentTarget.value,
      mergeProps({ htmlElement: event.currentTarget, validateOn: [event.type] }, props.onInputOptions)
    );

    //onInput prop is preserved
    if (typeof props.onInput === 'function') {
      props.onInput(event);
    } else {
      props.onInput?.[0](props.onInput?.[1], event);
    }
  };

  /**
   * Helper function for removing unneeded props.
   */
  const getPropsExcept = (keys: InputFieldPropKey[]) => {
    const [_, rest] = splitProps(store.props, keys);
    return rest;
  };

  /**
   * Helper function for check if the value matches the store value.
   */
  const matches = (value: any) => {
    if (store.props.value === undefined) return false;
    if (Array.isArray(store.props.value)) return store.props.value.some((item) => item == value);
    return value == store.props.value;
  };

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
    setStore('props', 'value', props.formHandler ? props.formHandler?.getFieldValue?.(props.name) : props.value);
  });

  /**
   * Initializes component's default value
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, props.value);
  });

  const [store, setStore] = createStore(baseStore as unknown as InputFieldStore);
  setStore('props', 'onInput', () => onInput);
  setStore('helpers', 'getPropsExcept', () => getPropsExcept);
  setStore('helpers', 'matches', () => matches);

  return props.render(store);
};

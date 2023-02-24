import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, createSelector, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type RadioGroupFieldPropKey = keyof RadioGroupFieldStore['props'];
type RadioGroupFieldStore = Omit<FieldStore, 'props' | 'helpers'> & {
  props: FieldStore['props'] & {
    onChange?: CommonEvent;
    value: never[];
  };
  helpers: FieldStore['helpers'] & {
    isChecked: (value: any) => boolean;
    getPropsExcept: (keys: RadioGroupFieldPropKey[]) => Pick<RadioGroupFieldStore['props'], RadioGroupFieldPropKey>;
  };
};

export type RadioGroupFieldProps = CommonFieldProps & {
  mode: 'radio-group';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: RadioGroupFieldStore) => JSXElement;
};

export const RadioGroupField: Component<RadioGroupFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Extended onInput event.
   */
  const onChange: RadioGroupFieldProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    baseStore.helpers.onValueChange(
      event.currentTarget.value,
      mergeProps({ htmlElement: event.currentTarget, validateOn: [event.type] }, props.onChangeOptions)
    );

    //onInput prop is preserved
    if (typeof props.onChange === 'function') {
      props.onChange(event);
    } else {
      props.onChange?.[0](props.onChange?.[1], event);
    }
  };

  /**
   * Helper function for removing unneeded props.
   */
  const getPropsExcept = (keys: RadioGroupFieldPropKey[]) => {
    const [_, rest] = splitProps(store.props, keys);
    return rest;
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
   * Initializes the form field default value.
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, props.value);
  });

  const [store, setStore] = createStore(baseStore as unknown as RadioGroupFieldStore);

  /**
   * Radio is checked
   */
  const isChecked = createSelector(() => store.props.value);

  setStore('props', 'value', []);
  setStore('props', 'onChange', () => onChange);
  setStore('helpers', 'isChecked', () => isChecked);
  setStore('helpers', 'getPropsExcept', () => getPropsExcept);

  return props.render(store);
};

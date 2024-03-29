import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, createSelector, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type CheckboxGroupFieldPropKey = keyof CheckboxGroupFieldStore['props'];
type CheckboxGroupFieldStore = Omit<FieldStore, 'props' | 'helpers'> & {
  props: Omit<FieldStore['props'], 'value'> & {
    onChange?: CommonEvent;
    value: never[];
  };
  helpers: Omit<FieldStore['helpers'], 'onValueChange'> & {
    onValueChange: (value: any, checked: boolean, options?: SetFieldValueOptions) => void;
    isChecked: (value: any) => boolean;
    getPropsExcept: (
      keys: CheckboxGroupFieldPropKey[]
    ) => Pick<CheckboxGroupFieldStore['props'], CheckboxGroupFieldPropKey>;
  };
};

export type CheckboxGroupFieldProps = CommonFieldProps & {
  mode: 'checkbox-group';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: CheckboxGroupFieldStore) => JSXElement;
};

export const CheckboxGroupField: Component<CheckboxGroupFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Helper method for setting the value to the form handler if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, checked: boolean, options?: SetFieldValueOptions) => {
    if (checked) {
      props.formHandler?.setFieldValue?.(props.name, [...store.props.value, value], options);
      //If unchecked, value is filtered from form handler.
    } else {
      props.formHandler?.setFieldValue?.(
        props.name,
        store.props.value.filter?.((item: any) => value != item),
        options
      );
    }
  };

  /**
   * Extended onChange event.
   */
  const onChange: CheckboxGroupFieldProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    onValueChange(
      event.currentTarget.value,
      event.currentTarget.checked,
      mergeProps({ validateOn: [event.type] }, props.onChangeOptions)
    );

    //onChange prop is preserved
    if (typeof props.onChange === 'function') {
      props.onChange(event);
    } else {
      props.onChange?.[0](props.onChange?.[1], event);
    }
  };

  /**
   * Helper function for removing unneeded props.
   */
  const getPropsExcept = (keys: CheckboxGroupFieldPropKey[]) => {
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
    props.formHandler?.setFieldDefaultValue(props.name, props.value);
  });

  /**
   * Base store is merged with checkbox field store.
   */
  const [store, setStore] = createStore(baseStore as unknown as CheckboxGroupFieldStore);

  /**
   * Checkbox is checked
   */
  const isChecked = createSelector(
    () => store.props.value,
    (optionValue: any, storeValue) => storeValue?.some?.((item) => item == optionValue)
  );

  setStore('props', 'value', []);
  setStore('props', 'onChange', () => onChange);
  setStore('helpers', 'isChecked', () => isChecked);
  setStore('helpers', 'onValueChange', () => onValueChange);
  setStore('helpers', 'getPropsExcept', () => getPropsExcept);

  return props.render(store);
};

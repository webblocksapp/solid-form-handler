import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type CheckboxFieldStore = Omit<FieldStore, 'props' | 'helpers'> & {
  props: FieldStore['props'] & {
    onChange?: CommonEvent;
    checked?: boolean;
  };
  helpers: Omit<FieldStore['helpers'], 'onValueChange'> & {
    onValueChange: (value: any, checked: boolean, options?: SetFieldValueOptions) => void;
  };
};

export type CheckboxFieldProps = CommonFieldProps & {
  mode: 'checkbox';
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  checked?: boolean;
  uncheckedValue?: any;
  render: (field: CheckboxFieldStore) => JSXElement;
};

export const CheckboxField: Component<CheckboxFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Helper method for setting the value to the form handler if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, checked: boolean, options?: SetFieldValueOptions) => {
    props.formHandler?.setFieldValue?.(props.name, value, options);
    setStore('props', 'checked', checked);
  };

  /**
   * Helper method for getting the value when checked.
   * - If no value prop is provided, checked flag is used as value.
   * - If value prop is provided, it's used as value
   * - If value and uncheckedValue prop are provided, uncheckedValue is used when checkbox is not checked.
   */
  const getValue = (checked?: boolean) => {
    if (props.value === undefined) return checked;
    if (checked) return props.value;
    return props.uncheckedValue || '';
  };

  /**
   * Extended onChange event.
   */
  const onChange: CheckboxFieldProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    onValueChange(
      getValue(event.currentTarget.checked),
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
   * Computes the checked status.
   * - If value is provided, it's compared with form handler value.
   * - If no value prop is provided, it's used the boolean flag stored at form handler.
   * - If checked prop is provided, it's used (controlled from outside)
   */
  createEffect(() => {
    setStore(
      'props',
      'checked',
      props.formHandler?.getFieldValue?.(props.name) == props.value ||
        (props.value === undefined && props.formHandler?.getFieldValue?.(props.name)) ||
        props.checked
    );
  });

  /**
   * Initializes the form field default value.
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, getValue(props.checked));
  });

  /**
   * Base store is merged with checkbox field store.
   */
  const [store, setStore] = createStore(baseStore as unknown as CheckboxFieldStore);
  setStore('props', 'onChange', () => onChange);
  setStore('helpers', 'onValueChange', () => onValueChange);

  return props.render(store);
};

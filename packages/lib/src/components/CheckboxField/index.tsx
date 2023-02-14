import { CommonEvent, CommonFieldProps, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

export interface CheckboxFieldProps extends CommonFieldProps {
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  checked?: boolean;
  uncheckedValue?: any;
}

export const CheckboxField: Component<CheckboxFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

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
    baseStore.helpers.onValueChange(
      getValue(event.currentTarget.checked),
      mergeProps({ validateOn: [event.type] }, props.onChangeOptions)
    );
    setStore('props', 'checked', event.currentTarget.checked);

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

  const [store, setStore] = createStore(baseStore);
  setStore('props', (prev) => ({ ...prev, onChange }));

  return props.children(store);
};

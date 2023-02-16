import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type RadioFieldStore = Omit<FieldStore, 'props'> & {
  props: FieldStore['props'] & {
    onChange?: CommonEvent;
    checked?: boolean;
  };
};

export type RadioFieldProps = CommonFieldProps & {
  mode: 'radio';
  checked?: boolean;
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: RadioFieldStore) => JSXElement;
};

export const RadioField: Component<RadioFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Returns value when checked.
   */
  const getValue = (checked?: boolean) => {
    if (checked) return props.value;
    return '';
  };

  /**
   * Extended onInput event.
   */
  const onChange: RadioFieldProps['onChange'] = (event) => {
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
   * Computes the checked status.
   * - If checked prop is provided, it's used (controlled from outside)
   * - If value is provided, it's compared with form handler value.
   */
  createEffect(() => {
    setStore(
      'props',
      'checked',
      props.formHandler?.getFieldValue?.(props.name) == props.value || props.checked || false
    );
  });

  /**
   * Initializes the form field default value.
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, getValue(props.checked));
  });

  const [store, setStore] = createStore<RadioFieldStore>(baseStore);
  setStore('props', 'onChange', () => onChange);

  return props.render(store);
};

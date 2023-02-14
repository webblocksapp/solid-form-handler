import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type InputFieldStore = FieldStore & {
  props: FieldStore['props'] & {
    onInput?: CommonEvent;
  };
};

export interface InputFieldProps extends CommonFieldProps {
  mode: 'input';
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
  render: (field: InputFieldStore) => JSXElement;
}

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
   * Initializes component's default value
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, props.value);
  });

  const [store, setStore] = createStore<InputFieldStore>(baseStore);
  setStore('props', (prev) => ({ ...prev, onInput }));

  return props.render(store);
};

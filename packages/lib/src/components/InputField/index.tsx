import { CommonEvent, CommonFieldProps, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';
import { PROPS_TO_SPLIT } from '@lib-components';

export interface InputFieldProps extends CommonFieldProps {
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
}

export const InputField: Component<InputFieldProps> = (props) => {
  const { baseStore, setBaseStore } = useFieldContext();
  const [_, rest] = splitProps(props, PROPS_TO_SPLIT as any);

  setBaseStore('props', (prev) => ({ ...prev, ...rest }));

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

  const [store, setStore] = createStore(baseStore);
  setStore('props', (prev) => ({ ...prev, onInput }));

  return props.children(store);
};

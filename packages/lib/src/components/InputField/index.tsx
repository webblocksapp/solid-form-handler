import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';
import { FieldDefinition, FieldPropsToOmit } from '@lib-components';

type InputFieldStore<TDef extends FieldDefinition = FieldDefinition> = Omit<FieldStore, 'props'> & {
  props: FieldStore['props'] & {
    onInput?: CommonEvent;
  } & FieldPropsToOmit<TDef['props']>;
};

export type InputFieldProps<TDef extends FieldDefinition = FieldDefinition> = CommonFieldProps & {
  mode: 'input';
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
  render: (field: InputFieldStore<TDef>) => JSXElement;
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

  const [store, setStore] = createStore<InputFieldStore>(baseStore);
  setStore('props', 'onInput', () => onInput);

  return props.render(store);
};

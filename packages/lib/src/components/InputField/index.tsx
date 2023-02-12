import { FieldProps, FieldStore, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';
import { Component, JSX, JSXElement, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type InputFieldStore = FieldStore & {
  props: FieldStore['props'] & {
    onInput: InputFieldProps['onInput'];
    onBlur: InputFieldProps['onBlur'];
  };
};

export interface InputFieldProps extends FieldProps {
  onInput?: JSX.InputHTMLAttributes<HTMLInputElement>['onInput'];
  onInputOptions?: SetFieldValueOptions;
  onBlur?: JSX.InputHTMLAttributes<HTMLInputElement>['onBlur'];
  onBlurOptions?: ValidateFieldOptions;
  children: (field: InputFieldStore) => JSXElement;
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
   * Extended onBlur event.
   */
  const onBlur: InputFieldProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    baseStore.helpers.onFieldBlur(props.onBlurOptions);

    //onBlur prop is preserved
    if (typeof props.onBlur === 'function') {
      props.onBlur(event);
    } else {
      props.onBlur?.[0](props.onBlur?.[1], event);
    }
  };

  const [store, setStore] = createStore(baseStore as InputFieldStore);
  setStore('props', (prev) => ({ ...prev, onInput, onBlur }));

  return props.children(store);
};

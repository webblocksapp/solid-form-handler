import { BaseFieldProps, BaseFieldStore } from '@interfaces';
import { Component, JSX, JSXElement } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type InputFieldStore = BaseFieldStore & {
  props: BaseFieldStore['props'] & {
    onInput: InputFieldProps['onInput'];
    onBlur: InputFieldProps['onBlur'];
  };
};

export interface InputFieldProps extends BaseFieldProps {
  onInput?: JSX.InputHTMLAttributes<HTMLInputElement>['onInput'];
  onBlur?: JSX.InputHTMLAttributes<HTMLInputElement>['onBlur'];
  children: (field: InputFieldStore) => JSXElement;
}

export const InputField: Component<InputFieldProps> = (props) => {
  const { baseStore } = useFieldContext();

  /**
   * Extended onInput event.
   */
  const onInput: InputFieldProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    props.formHandler?.setFieldValue?.(props.name, event.currentTarget.value, {
      htmlElement: event.currentTarget,
      validateOn: [event.type],
    });

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
    props.formHandler?.validateField?.(props.name);
    props.formHandler?.touchField?.(props.name);

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

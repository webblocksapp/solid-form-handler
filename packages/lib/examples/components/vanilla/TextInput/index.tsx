import { FormHandler } from '@interfaces';
import { Component, createEffect, JSX, onMount, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
}

export const TextInput: Component<TextInputProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining inherited props applied to the original component.
   */
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'id',
    'label',
    'onBlur',
    'onInput',
    'value',
    'classList',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    value: '',
    id: '',
  });

  /**
   * Extended onInput event.
   */
  const onInput: TextInputProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value, {
      htmlElement: event.currentTarget,
    });

    //onInput prop is preserved
    if (typeof local.onInput === 'function') {
      local.onInput(event);
    } else {
      local.onInput?.[0](local.onInput?.[1], event);
    }
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: TextInputProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(rest.name);
    local.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * Updates field value when form reset signal is emitted, only if a default value is given.
   */
  createEffect(() => {
    local.formHandler?.formWasReset() && local.formHandler?.setFieldDefaultValue(rest.name, local.value);
  });

  /**
   * Value is controlled by the component itself.
   */
  createEffect(() => {
    setStore('value', props?.formHandler?.getFieldValue?.(rest.name) || '');
  });

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('errorMessage', local.errorMessage || local.formHandler?.getFieldError?.(rest.name) || '');
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('error', local.error || local.formHandler?.fieldHasError?.(rest.name) || false);
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || rest.name || '');
  });

  /**
   * Initializes the form field default value
   */
  onMount(() => {
    setTimeout(() => local.formHandler?.setFieldDefaultValue(rest.name, local.value));
  });

  return (
    <div classList={local.classList}>
      {local.label && <label for={store.id}>{local.label}</label>}
      <input
        {...rest}
        classList={{ error: store.error }}
        id={store.id}
        onInput={onInput}
        onBlur={onBlur}
        value={store.value}
      />
      {store.error && <small class="invalid-feedback">{store.errorMessage}</small>}
    </div>
  );
};

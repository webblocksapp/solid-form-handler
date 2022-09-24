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
    defaultValue: '',
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
    local.formHandler?.formIsResetting() && local.formHandler?.setFieldDefaultValue(rest.name, store.defaultValue);
  });

  /**
   * Single source of truth for default value and value.
   */
  createEffect(() => {
    setStore('defaultValue', local.value as any);
    //If formHandler is defined, value is controlled by the same component, if no, by the value prop.
    setStore('value', local.formHandler ? local.formHandler?.getFieldValue?.(rest.name) : local.value);
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
    local.formHandler?.setFieldDefaultValue(rest.name, store.defaultValue);
  });

  return (
    <div classList={local.classList}>
      {local.label && (
        <label class="form-label" for={store.id}>
          {local.label}
        </label>
      )}
      <input
        {...rest}
        classList={{ 'is-invalid': store.error, 'form-control': true }}
        id={store.id}
        onInput={onInput}
        onBlur={onBlur}
        value={store.value}
      />
      {store.error && <div class="invalid-feedback">{store.errorMessage}</div>}
    </div>
  );
};

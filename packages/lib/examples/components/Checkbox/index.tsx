import { FormHandler } from '@interfaces';
import { Component, createEffect, JSX, onMount, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  uncheckedValue?: string | number;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining inherited props applied to the original component.
   */
  const [local, rest] = splitProps(props, [
    'checked',
    'error',
    'errorMessage',
    'formHandler',
    'id',
    'label',
    'onBlur',
    'onChange',
    'uncheckedValue',
    'classList',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    id: '',
    checked: false,
  });

  /**
   * Extended onInput event.
   */
  const onChange: CheckboxProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, getValue(event.currentTarget.checked));
    setStore('checked', event.currentTarget.checked);

    //onInput prop is preserved
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: CheckboxProps['onBlur'] = (event) => {
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
   * Helper method for getting the value when checked.
   * - If no value prop is provided, checked flag is used as value.
   * - If value prop is provided, it's used as value
   * - If value and uncheckedValue prop are provided, uncheckedValue is used when checkbox is not checked.
   */
  const getValue = (checked?: boolean) => {
    if (rest.value === undefined) return checked;
    if (checked) return rest.value;
    return local.uncheckedValue || '';
  };

  /**
   * Computes the checked status.
   * - If checked prop is provided, it's used (controlled from outside)
   * - If no value prop is provided, it's used the boolean flag stored at form handler.
   * - If value is provided, it's compared with form handler value.
   */
  createEffect(() => {
    if (typeof local.checked === 'boolean') {
      setStore('checked', local.checked);
    } else if (rest.value === undefined) {
      setStore('checked', local.formHandler?.getFieldValue?.(rest.name));
    } else {
      setStore('checked', local.formHandler?.getFieldValue?.(rest.name) == rest.value);
    }
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
    local.formHandler?.setFieldDefaultValue(rest.name, getValue(local.checked));
  });

  return (
    <div classList={local.classList}>
      <div
        classList={{
          'is-invalid': local.error || local?.formHandler?.fieldHasError?.(rest.name),
          'form-check': true,
        }}
      >
        <input
          {...rest}
          type="checkbox"
          classList={{ 'is-invalid': store.error, 'form-check-input': true }}
          checked={store.checked}
          id={store.id}
          onChange={onChange}
          onBlur={onBlur}
        />
        {local.label && (
          <label class="form-check-label" for={store.id}>
            {local.label}
          </label>
        )}
      </div>
      {store.error && <div class="invalid-feedback">{store.errorMessage}</div>}
    </div>
  );
};

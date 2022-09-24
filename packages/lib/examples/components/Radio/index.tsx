import { FormHandler } from '@interfaces';
import { Component, createEffect, JSX, onMount, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface RadioProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  value: string | number;
}

export const Radio: Component<RadioProps> = (props) => {
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
    'onChange',
    'classList',
    'checked',
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
   * Extended onChange event.
   */
  const onChange: RadioProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);

    //onChange prop is preserved
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  /**
   * Returns value when checked.
   */
  const getValue = (checked?: boolean) => {
    if (checked) return rest.value;
    return '';
  };

  /**
   * Computes the checked status.
   * - If checked prop is provided, it's used (controlled from outside)
   * - If value is provided, it's compared with form handler value.
   */
  createEffect(() => {
    if (typeof local.checked === 'boolean') {
      setStore('checked', local.checked);
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
    local.checked !== undefined && local.formHandler?.setFieldDefaultValue(rest.name, getValue(local.checked));
  });

  return (
    <div classList={local.classList}>
      <div classList={{ 'form-check': true, 'is-invalid': store.error }}>
        <input
          {...rest}
          classList={{ 'form-check-input': true, 'is-invalid': store.error }}
          id={store.id}
          type="radio"
          checked={store.checked}
          onChange={onChange}
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

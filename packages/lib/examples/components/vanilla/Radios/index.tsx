import { Component, createEffect, createSelector, For, JSX, onMount, splitProps } from 'solid-js';
import { Radio } from '@vanilla-components';
import { FormHandler } from '@interfaces';
import { createStore } from 'solid-js/store';

type SelectableOption = { value: string | number; label: string };

export interface RadiosProps {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  options?: Array<SelectableOption>;
  name?: string;
  onChange?: JSX.DOMAttributes<HTMLInputElement>['onChange'];
  onBlur?: JSX.DOMAttributes<HTMLInputElement>['onBlur'];
  value?: string | number;
}

export const Radios: Component<RadiosProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining props from the interface.
   */
  const [local, rest] = splitProps(props, ['error', 'errorMessage', 'onChange', 'onBlur']);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    defaultValue: '',
    value: '',
  });

  /**
   * Radio is checked
   */
  const checked = createSelector(() => store.value);

  /**
   * Extended onChange event.
   */
  const onChange: RadiosProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    rest.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);

    //onChange prop is preserved
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  /**
   * Checkboxes onBlur event.
   */
  const onBlur: RadiosProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    rest.formHandler?.validateField?.(rest.name);
    rest.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('errorMessage', local.errorMessage || rest.formHandler?.getFieldError?.(rest.name) || '');
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('error', local.error || rest.formHandler?.fieldHasError?.(rest.name) || false);
  });

  /**
   * Single source of truth for default value and value.
   */
  createEffect(() => {
    const value: any = rest.value;
    setStore('defaultValue', value);
    //If formHandler is defined, value is controlled by the same component, if no, by the value prop.
    setStore('value', rest.formHandler ? rest.formHandler?.getFieldValue?.(rest.name) : value);
  });

  /**
   * Initializes the form field default value
   */
  onMount(() => {
    rest.formHandler?.setFieldDefaultValue(rest.name, store.defaultValue);
  });

  return (
    <div>
      {rest.label && <label>{rest.label}</label>}
      <For each={rest.options}>
        {(option, i) => (
          <Radio
            id={`${rest.name}-${i()}`}
            label={option.label}
            value={option.value}
            name={rest.name}
            onChange={onChange}
            onBlur={onBlur}
            error={store.error}
            checked={checked(option.value)}
          />
        )}
      </For>
      {store.error && <small class="invalid-feedback">{store.errorMessage}</small>}
    </div>
  );
};

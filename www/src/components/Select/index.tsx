import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { FormHandler } from 'solid-form-handler';

type SelectableOption = { value: string | number; label: string };

export interface SelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  options?: Array<SelectableOption>;
  placeholder?: string;
}

export const Select: Component<SelectProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining inherited props applied to the original component.
   */
  const [local, rest] = splitProps(props, [
    'classList',
    'error',
    'errorMessage',
    'formHandler',
    'id',
    'label',
    'onBlur',
    'onInput',
    'options',
    'placeholder',
    'value',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    error: false,
    errorMessage: '',
    id: '',
    value: '',
    defaultValue: '',
  });

  /**
   * Derived/computed options from props
   */
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Extended onInput event.
   */
  const onInput: SelectProps['onInput'] = (event) => {
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
  const onBlur: SelectProps['onBlur'] = (event) => {
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
   * Single source of truth for default value and value.
   */
  createEffect(() => {
    setStore('defaultValue', local.value as any);
    //If formHandler is defined, value is controlled by the same component, if no, by the value prop.
    setStore(
      'value',
      local.formHandler
        ? local.formHandler?.getFieldValue?.(rest.name)
        : local.value
    );
  });

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'errorMessage',
      local.errorMessage || local.formHandler?.getFieldError?.(rest.name) || ''
    );
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'error',
      local.error || local.formHandler?.fieldHasError?.(rest.name) || false
    );
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || rest.name || '');
  });

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(local.placeholder ? [{ value: '', label: local.placeholder }] : []),
      ...(local.options || []),
    ]);
  });

  /**
   * Initializes the form field default value
   */
  onMount(() => {
    local.formHandler?.setFieldDefaultValue(rest.name, store.defaultValue);
  });

  /**
   * Refresh the form field when unmounted.
   */
  onCleanup(() => {
    local.formHandler?.refreshFormField(rest.name);
  });

  return (
    <div classList={local.classList}>
      {local.label && (
        <label class="form-label" for={store.id}>
          {local.label}
        </label>
      )}
      <select
        {...rest}
        classList={{ 'is-invalid': store.error, 'form-select': true }}
        id={store.id}
        onInput={onInput}
        onBlur={onBlur}
        value={store.value}
      >
        <For each={options()}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
      {store.error && <div class="invalid-feedback">{store.errorMessage}</div>}
    </div>
  );
};

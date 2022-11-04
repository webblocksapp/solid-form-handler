import { FormHandler } from '@interfaces';
import { Component, createEffect, createSignal, JSX, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface FileInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  triggers?: string[];
}

export const FileInput: Component<FileInputProps> = (props) => {
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
    'onClick',
    'onInput',
    'value',
    'classList',
    'triggers',
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
   * Clicked signal to prevent validate input when file selection
   * window appears.
   */
  const [clicked, setClicked] = createSignal<boolean>(false);

  /**
   * Extended onInput event.
   */
  const onInput: FileInputProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value, {
      htmlElement: event.currentTarget,
      validateOn: [event.type],
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
  const onBlur: FileInputProps['onBlur'] = (event) => {
    if (clicked()) {
      setClicked(false);
      return;
    }

    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(rest.name, { validateOn: [event.type] });
    local.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * Extended onClick event.
   */
  const onClick: FileInputProps['onClick'] = (event) => {
    setClicked(true);

    //onClick prop is preserved
    if (typeof local.onClick === 'function') {
      local.onClick(event);
    } else {
      local.onClick?.[0](local.onClick?.[1], event);
    }
  };

  /**
   * Controls component's value.
   */
  createEffect(() => {
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
   * Initializes component's default value
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(rest.name, local.value);
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(rest.name, local.triggers);
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
        type="file"
        classList={{ 'is-invalid': store.error, 'form-control': true }}
        id={store.id}
        onInput={onInput}
        onBlur={onBlur}
        onClick={onClick}
      />
      {store.error && <div class="invalid-feedback">{store.errorMessage}</div>}
    </div>
  );
};

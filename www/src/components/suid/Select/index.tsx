import { FormHandler } from 'solid-form-handler';
import {
  Component,
  createEffect,
  createSignal,
  createUniqueId,
  For,
  splitProps,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import SuidNativeSelect, {
  NativeSelectProps as SuidNativeSelectProps,
} from '@suid/material/NativeSelect';
import FormHelperText from '@suid/material/FormHelperText';
import FormLabel from '@suid/material/FormLabel';
import FormGroup from '@suid/material/FormGroup';

type SelectableOption = { value: string | number; label: string };

export interface SelectProps extends SuidNativeSelectProps {
  errorMessage?: string;
  formHandler?: FormHandler;
  helperText?: string;
  label?: string;
  options?: Array<SelectableOption>;
  placeholder?: string;
  triggers?: string[];
}

export const Select: Component<SelectProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining inherited props applied to the original component.
   */
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'helperText',
    'id',
    'label',
    'onBlur',
    'onChange',
    'options',
    'placeholder',
    'value',
    'triggers',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    error: false,
    errorMessage: '',
    id: '',
    value: '',
  });

  /**
   * Derived/computed options from props
   */
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Extended onInput event.
   */
  const onChange: SelectProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value, {
      htmlElement: event.currentTarget,
      validateOn: [event.type],
    });

    //onChange prop is preserved
    local?.onChange?.(event);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: SelectProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(rest.name, { validateOn: [event.type] });
    local.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    local?.onBlur?.(event);
  };

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
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
    setStore('id', local.id || createUniqueId());
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
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(rest.name, local.triggers);
  });

  /**
   * Initializes component's default value
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(rest.name, local.value);
  });

  return (
    <FormGroup>
      {local.label && (
        <FormLabel error={store.error} required={rest.required}>
          {local.label}
        </FormLabel>
      )}
      <SuidNativeSelect
        {...rest}
        error={store.error}
        id={store.id}
        onChange={onChange}
        onBlur={onBlur}
      >
        <For each={options()}>
          {(option) => (
            <option value={option.value} selected={option.value == store.value}>
              {option.label}
            </option>
          )}
        </For>
      </SuidNativeSelect>
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && (
        <FormHelperText error={store.error}>
          {store.errorMessage}
        </FormHelperText>
      )}
    </FormGroup>
  );
};

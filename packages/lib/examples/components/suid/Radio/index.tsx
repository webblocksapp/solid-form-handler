import { FormHandler } from '@interfaces';
import { Component, createEffect, createUniqueId, splitProps } from 'solid-js';
import SuidRadio, { RadioProps as SuidRadioProps } from '@suid/material/Radio';
import { createStore } from 'solid-js/store';
import FormControlLabel from '@suid/material/FormControlLabel';
import FormHelperText from '@suid/material/FormHelperText';

export type RadioProps = SuidRadioProps & {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  helperText?: string;
  label?: string;
  value: string | number;
  triggers?: string[];
};

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
    'helperText',
    'id',
    'label',
    'onBlur',
    'onChange',
    'classList',
    'checked',
    'triggers',
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
  const onChange: RadioProps['onChange'] = (event, checked) => {
    //Form handler prop sets and validate the value onChange.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value, { validateOn: [event.type] });

    //onChange prop is preserved
    local?.onChange?.(event, checked);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: RadioProps['onBlur'] = (event) => {
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
    setStore('checked', local.formHandler?.getFieldValue?.(rest.name) == rest.value || local.checked || false);
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
    setStore('id', local.id || createUniqueId());
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(rest.name, local.triggers);
  });

  /**
   * Initializes the form field default value.
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(rest.name, getValue(local.checked));
  });

  return (
    <div>
      <FormControlLabel
        control={<SuidRadio {...rest} checked={store.checked} id={store.id} onChange={onChange} onBlur={onBlur} />}
        label={local.label}
      />
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && <FormHelperText error={store.error}>{store.errorMessage}</FormHelperText>}
    </div>
  );
};

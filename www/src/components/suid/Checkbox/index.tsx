import { FormHandler } from '@interfaces';
import SuidCheckbox, { CheckboxTypeMap } from '@suid/material/Checkbox';
import { Component, createEffect, createUniqueId, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import FormHelperText from '@suid/material/FormHelperText';
import FormControlLabel from '@suid/material/FormControlLabel';

type SuidCheckboxProps = CheckboxTypeMap['props'] &
  CheckboxTypeMap['selfProps'];

export type CheckboxProps = SuidCheckboxProps & {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  helperText?: string;
  label?: string;
  uncheckedValue?: string | number;
  triggers?: string[];
};

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
    'helperText',
    'id',
    'label',
    'onBlur',
    'onChange',
    'uncheckedValue',
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
   * Extended onInput event.
   */
  const onChange: CheckboxProps['onChange'] = (event, checked) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, getValue(checked), {
      validateOn: [event.type],
    });
    setStore('checked', checked);

    //onChange prop is preserved
    local?.onChange?.(event, checked);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: CheckboxProps['onBlur'] = (event) => {
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
   * - If value is provided, it's compared with form handler value.
   * - If no value prop is provided, it's used the boolean flag stored at form handler.
   * - If checked prop is provided, it's used (controlled from outside)
   */
  createEffect(() => {
    setStore(
      'checked',
      local.formHandler?.getFieldValue?.(rest.name) == rest.value ||
        (rest.value === undefined &&
          local.formHandler?.getFieldValue?.(rest.name)) ||
        (local.checked ?? false)
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
   * Initializes the form field default value.
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(
      rest.name,
      getValue(local.checked)
    );
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(rest.name, local.triggers);
  });

  return (
    <div>
      <FormControlLabel
        control={
          <SuidCheckbox
            {...rest}
            checked={store.checked}
            id={store.id}
            onChange={onChange}
            onBlur={onBlur}
          />
        }
        label={local.label}
      />
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && (
        <FormHelperText error={store.error}>
          {store.errorMessage}
        </FormHelperText>
      )}
    </div>
  );
};

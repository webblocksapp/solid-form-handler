import { FieldProps, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';
import { Component, createEffect, createUniqueId, Match, mergeProps, splitProps, Switch } from 'solid-js';
import { useFieldContext, withFieldProvider } from '@hocs';
import { CheckboxField, CheckboxFieldProps, InputField, InputFieldProps } from '@lib-components';

type FieldByModeProps = ({ mode?: 'input' } & InputFieldProps) | ({ mode?: 'checkbox' } & CheckboxFieldProps);

export type FieldComponentProps = FieldProps & FieldByModeProps;

export const PROPS_TO_SPLIT = ['error', 'errorMessage', 'formHandler', 'mode', 'children', 'triggers'] as const;

export const Field: Component<FieldComponentProps> = withFieldProvider((props) => {
  props = mergeProps({ mode: 'input' as FieldByModeProps['mode'] }, props);
  const { setBaseStore } = useFieldContext();

  /**
   * Helper method for setting the value to the form handler if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, options?: SetFieldValueOptions) => {
    props.formHandler?.setFieldValue?.(props.name, value, options);
  };

  /**
   * Helper method for triggering the form handler validation when the field is blurred
   * if no form field event attribute matches the expected interface.
   */
  const onFieldBlur = (options?: ValidateFieldOptions) => {
    props.formHandler?.validateField?.(props.name, options);
    props.formHandler?.touchField?.(props.name);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: FieldComponentProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    onFieldBlur(props.onBlurOptions);

    //onBlur prop is preserved
    if (typeof props.onBlur === 'function') {
      props.onBlur(event);
    } else {
      props.onBlur?.[0](props.onBlur?.[1], event);
    }
  };

  /**
   * Set helper methods.
   */
  setBaseStore('helpers', 'onValueChange', () => onValueChange);
  setBaseStore('helpers', 'onFieldBlur', () => onFieldBlur);

  /**
   * Initializes common event methods.
   */
  setBaseStore('props', 'onBlur', () => onBlur);

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
    setBaseStore('props', 'value', props.formHandler ? props.formHandler?.getFieldValue?.(props.name) : props.value);
  });

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setBaseStore('helpers', 'errorMessage', props.errorMessage || props.formHandler?.getFieldError?.(props.name) || '');
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setBaseStore('helpers', 'error', props.error || props.formHandler?.fieldHasError?.(props.name) || false);
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setBaseStore('props', 'id', props.id || createUniqueId());
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    props?.formHandler?.setFieldTriggers?.(props.name, props.triggers);
  });

  /**
   * Initializes name at store
   */
  createEffect(() => {
    setBaseStore('props', 'name', props.name || '');
  });

  return (
    <Switch>
      <Match when={props.mode === 'input'}>
        <InputField {...props}>{(field) => props.children(field)}</InputField>
      </Match>
      <Match when={props.mode === 'checkbox'}>
        <CheckboxField {...props}>{(field) => props.children(field)}</CheckboxField>
      </Match>
    </Switch>
  );
});

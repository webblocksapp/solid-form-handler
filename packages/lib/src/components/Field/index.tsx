import { InputField, InputFieldProps } from '@lib-components';
import { BaseFieldProps, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';
import { Component, createEffect, createUniqueId, Match, mergeProps, Switch } from 'solid-js';
import { useFieldContext, withFieldProvider } from '@hocs';

type FieldByModeProps =
  | ({ mode?: undefined } & InputFieldProps)
  | ({ mode: 'input' } & InputFieldProps)
  | ({ mode: 'select' } & { children?: any });

type FieldProps = BaseFieldProps & FieldByModeProps;

export const Field: Component<FieldProps> = withFieldProvider((props) => {
  props = mergeProps({ mode: 'input' as FieldProps['mode'] }, props);

  const { setBaseStore } = useFieldContext();

  /**
   * Helper method for setting the value to the form handler if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, options?: SetFieldValueOptions) => {
    props.formHandler?.setFieldValue?.(props.name, value, options);
  };

  setBaseStore('helpers', (prev) => ({ ...prev, onValueChange }));

  /**
   * Helper method for triggering the form handler validation when the field is blurred
   * if no form field event attribute matches the expected interface.
   */
  const onFieldBlur = (options?: ValidateFieldOptions) => {
    props.formHandler?.validateField?.(props.name, options);
    props.formHandler?.touchField?.(props.name);
  };

  setBaseStore('helpers', (prev) => ({ ...prev, onFieldBlur }));

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
   * Initializes component's default value
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, props.value);
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
      <Match when={props.mode === 'input' || props.mode === undefined}>
        <InputField {...props}>{(field) => props.children(field)}</InputField>
      </Match>
    </Switch>
  );
});

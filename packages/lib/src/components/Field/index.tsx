import { CommonEvent, FieldProps, FieldStore, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';
import { Component, createEffect, createUniqueId, JSXElement, Match, mergeProps, splitProps, Switch } from 'solid-js';
import { useFieldContext, withFieldProvider } from '@hocs';

interface CommonFieldProps extends FieldProps {
  onInput?: CommonEvent;
  onInputOptions?: SetFieldValueOptions;
  onBlur?: CommonEvent;
  onBlurOptions?: ValidateFieldOptions;
  children: (field: FieldStore) => JSXElement;
}

type FieldByModeProps = { mode?: undefined } & CommonFieldProps;

export type FieldComponentProps = FieldProps & FieldByModeProps;

export const Field: Component<FieldComponentProps> = withFieldProvider((props) => {
  const [_, rest] = splitProps(props, ['error', 'errorMessage', 'formHandler', 'mode', 'children', 'triggers']);
  const { baseStore, setBaseStore } = useFieldContext();

  setBaseStore('props', (prev) => ({ ...prev, ...rest }));

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
   * Extended onInput event.
   */
  const onInput: CommonFieldProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    onValueChange(
      event.currentTarget.value,
      mergeProps({ htmlElement: event.currentTarget, validateOn: [event.type] }, props.onInputOptions)
    );

    //onInput prop is preserved
    if (typeof props.onInput === 'function') {
      props.onInput(event);
    } else {
      props.onInput?.[0](props.onInput?.[1], event);
    }
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: CommonFieldProps['onBlur'] = (event) => {
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
   * Extended onChange event
   */
  const onChange = onInput;

  /**
   * Set helper methods.
   */
  setBaseStore('helpers', 'onValueChange', () => onValueChange);
  setBaseStore('helpers', 'onFieldBlur', () => onFieldBlur);

  /**
   * Initializes event methods according to the mode
   */
  if (props.mode === undefined) {
    setBaseStore('props', 'onInput', () => onInput);
  }

  /**
   * Initializes common event methods according to the mode
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
      <Match when={props.mode === undefined}>{props.children(baseStore)}</Match>
    </Switch>
  );
});

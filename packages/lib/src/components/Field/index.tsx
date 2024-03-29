import { CommonEvent, FieldProps, SetFieldValueOptions, ValidateFieldOptions } from '@interfaces';
import { createEffect, createUniqueId, mergeProps, splitProps } from 'solid-js';
import { useFieldContext, withFieldProvider } from '@hocs';
import {
  CheckboxField,
  CheckboxFieldProps,
  CheckboxGroupField,
  CheckboxGroupFieldProps,
  FileInputField,
  FileInputFieldProps,
  InputField,
  InputFieldProps,
  RadioGroupField,
  RadioGroupFieldProps,
} from '@components';

const FIELD_PROPS_TO_OMIT = ['error', 'errorMessage', 'formHandler', 'render', 'triggers', 'mode'] as const;
const FIELD_PROPS_TO_PRESERVE = ['id', 'name', 'value', 'onInput', 'onChange'] as const;

export type FieldComponentProps =
  | InputFieldProps
  | FileInputFieldProps
  | CheckboxFieldProps
  | CheckboxGroupFieldProps
  | RadioGroupFieldProps;
export type FieldPropsReturn = FieldProps & {
  onInput?: CommonEvent;
  onChange?: CommonEvent;
};

export const Field = withFieldProvider((props: FieldComponentProps) => {
  const [_, rest] = splitProps(props, FIELD_PROPS_TO_OMIT);
  const [local] = splitProps(rest as any, FIELD_PROPS_TO_PRESERVE);
  const { setBaseStore } = useFieldContext();

  setBaseStore('props', local);

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
    props.formHandler?.touchField?.(props.name);
    props.formHandler?.setFieldValue(props.name, props.formHandler?.getFieldValue(props.name), options);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: FieldComponentProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    onFieldBlur({ ...props.onBlurOptions, validateOn: ['blur'] });

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

  /**
   * Discriminated unions don't work with SolidJS Switch component,
   * for this reason is used normal JS switch.
   */
  switch (props.mode) {
    case 'input':
      return <InputField {...props} />;
    case 'file-input':
      return <FileInputField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'checkbox-group':
      return <CheckboxGroupField {...props} />;
    case 'radio-group':
      return <RadioGroupField {...props} />;
  }
});

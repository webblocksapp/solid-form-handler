const e=`import { FormHandler } from '@interfaces';
import { Component, createEffect, createUniqueId, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import SuidTextInput, {
  TextFieldProps as SuidTextInputProps,
} from '@suid/material/TextField';
import FormHelperText from '@suid/material/FormHelperText';
import FormGroup from '@suid/material/FormGroup';

export type TextInputProps = SuidTextInputProps & {
  errorMessage?: string;
  formHandler?: FormHandler;
  triggers?: string[];
};

export const TextInput: Component<TextInputProps> = (props) => {
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
    'onBlur',
    'onChange',
    'value',
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
   * Extended onInput event.
   */
  const onChange: TextInputProps['onChange'] = (event, value) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, event.target.value, {
      htmlElement: event.currentTarget,
      validateOn: [event.type],
    });

    //onChange prop is preserved
    local?.onChange?.(event, value);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: TextInputProps['onBlur'] = (event) => {
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
    <FormGroup>
      <SuidTextInput
        {...rest}
        error={store.error}
        id={store.id}
        onChange={onChange}
        onBlur={onBlur}
        value={store.value}
      />
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && (
        <FormHelperText error={store.error}>
          {store.errorMessage}
        </FormHelperText>
      )}
    </FormGroup>
  );
};
`;export{e as default};
//# sourceMappingURL=index-8e6c511f.js.map

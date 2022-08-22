import { Component, JSX, splitProps } from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
}

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'label',
  ]);

  const onInput: TextInputProps['onInput'] = (event) => {
    local?.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);
    if (typeof props.onInput === 'function') {
      props.onInput(event);
    } else {
      props?.onInput?.[0](props?.onInput?.[1], event);
    }
  };

  const onBlur: TextInputProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(rest.name);
    local?.formHandler?.touchField?.(rest.name);
    if (typeof props.onBlur === 'function') {
      props.onBlur(event);
    } else {
      props?.onBlur?.[0](props?.onBlur?.[1], event);
    }
  };

  return (
    <>
      {local.label && <label class="form-label">{local.label}</label>}
      <input
        {...rest}
        classList={{
          ...rest.classList,
          'is-invalid':
            local.error || local?.formHandler?.fieldHasError?.(rest.name),
          'form-control': true,
        }}
        value={rest.value || local?.formHandler?.getFieldValue?.(rest.name)}
        onInput={onInput}
        onBlur={onBlur}
      />
      {(local.error || local?.formHandler?.fieldHasError?.(rest.name)) && (
        <div class="invalid-feedback">
          {local.errorMessage || local?.formHandler?.getFieldError?.(rest.name)}
        </div>
      )}
    </>
  );
};

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
    'onInput',
    'onBlur',
  ]);

  const onInput: TextInputProps['onInput'] = (event) => {
    local?.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);
    if (typeof local.onInput === 'function') {
      local.onInput(event);
    } else {
      local?.onInput?.[0](local?.onInput?.[1], event);
    }
  };

  const onBlur: TextInputProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(rest.name);
    local?.formHandler?.touchField?.(rest.name);
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local?.onBlur?.[0](local?.onBlur?.[1], event);
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

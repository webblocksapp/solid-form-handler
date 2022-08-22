import { Component, JSX, splitProps } from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
  onBlur?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
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
    local?.onInput?.(event);
  };

  const onBlur: TextInputProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(rest.name);
    local?.formHandler?.touchField?.(rest.name);
    local?.onBlur?.(event);
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

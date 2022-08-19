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
    local?.formHandler?.setFieldValue?.(props.name, event.currentTarget.value);
    local?.onInput?.(event);
  };

  const onBlur: TextInputProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(props.name);
    local?.formHandler?.touchField?.(props.name);
    local?.onBlur?.(event);
  };

  return (
    <>
      {local.label && <label class="form-label">{local.label}</label>}
      <input
        {...rest}
        classList={{
          ...props.classList,
          'is-invalid':
            local.error || local?.formHandler?.fieldHasError?.(props.name),
          'form-control': true,
        }}
        value={props.value || local?.formHandler?.getFieldValue?.(props.name)}
        onInput={onInput}
        onBlur={onBlur}
      />
      {(local.error || local?.formHandler?.fieldHasError?.(props.name)) && (
        <div class="invalid-feedback">
          {local.errorMessage ||
            local?.formHandler?.getFieldError?.(props.name)}
        </div>
      )}
    </>
  );
};

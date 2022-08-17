import { Component, JSX } from 'solid-js';
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
  const onInput: TextInputProps['onInput'] = (event) => {
    props?.formHandler?.setFieldValue?.(props.name, event.currentTarget.value);
    props?.onInput?.(event);
  };

  const onBlur: TextInputProps['onBlur'] = (event) => {
    props?.formHandler?.validateField?.(props.name);
    props?.formHandler?.touchField?.(props.name);
    props?.onBlur?.(event);
  };

  return (
    <>
      {props.label && <label class="form-label">{props.label}</label>}
      <input
        {...props}
        classList={{
          ...props.classList,
          'is-invalid':
            props.error || props?.formHandler?.fieldHasError?.(props.name),
          'form-control': true,
        }}
        value={props.value || props?.formHandler?.getFieldValue?.(props.name)}
        onInput={onInput}
        onBlur={onBlur}
      />
      {(props.error || props?.formHandler?.fieldHasError?.(props.name)) && (
        <div class="invalid-feedback">
          {props.errorMessage ||
            props?.formHandler?.getFieldError?.(props.name)}
        </div>
      )}
    </>
  );
};

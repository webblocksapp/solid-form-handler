import { Component, JSX, For } from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface SelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  options?: { value: string | number; label: string }[];
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLSelectElement;
      target: Element;
    }
  ) => void;
  onBlur?: (
    event: FocusEvent & {
      currentTarget: HTMLSelectElement;
      target: Element;
    }
  ) => void;
}

export const Select: Component<SelectProps> = (props) => {
  const onInput: SelectProps['onInput'] = (event) => {
    props?.formHandler?.setFieldValue?.(props.name, event.currentTarget.value);
    props?.onInput?.(event);
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
    props?.formHandler?.validateField?.(props.name);
    props?.formHandler?.touchField?.(props.name);
    props.onBlur?.(event);
  };

  return (
    <>
      {props.label && <label class="form-label">{props.label}</label>}
      <select
        {...props}
        classList={{
          ...props.classList,
          'is-invalid':
            props.error || props?.formHandler?.fieldHasError?.(props.name),
          'form-select': true,
        }}
        value={props.value || props?.formHandler?.getFieldValue?.(props.name)}
        onInput={onInput}
        onBlur={onBlur}
      >
        <For each={props.options}>
          {(option) => (
            <option
              value={option.value}
              selected={
                props.value == option.value ||
                props?.formHandler?.getFieldValue?.(props.name) == option.value
              }
            >
              {option.label}
            </option>
          )}
        </For>
      </select>
      {(props.error || props?.formHandler?.fieldHasError?.(props.name)) && (
        <div class="invalid-feedback">
          {props.errorMessage ||
            props?.formHandler?.getFieldError?.(props.name)}
        </div>
      )}
    </>
  );
};

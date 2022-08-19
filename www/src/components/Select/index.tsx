import { Component, JSX, For, splitProps } from 'solid-js';
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
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'label',
    'options',
    'onInput',
    'onBlur',
  ]);

  const onInput: SelectProps['onInput'] = (event) => {
    local?.formHandler?.setFieldValue?.(props.name, event.currentTarget.value);
    local?.onInput?.(event);
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(props.name);
    local?.formHandler?.touchField?.(props.name);
    local?.onBlur?.(event);
  };

  return (
    <>
      {local.label && <label class="form-label">{local.label}</label>}
      <select
        {...rest}
        classList={{
          ...props.classList,
          'is-invalid':
            local.error || local?.formHandler?.fieldHasError?.(props.name),
          'form-select': true,
        }}
        value={props.value || local?.formHandler?.getFieldValue?.(props.name)}
        onInput={onInput}
        onBlur={onBlur}
      >
        <For each={local.options}>
          {(option) => (
            <option
              value={option.value}
              selected={
                props.value == option.value ||
                local?.formHandler?.getFieldValue?.(props.name) == option.value
              }
            >
              {option.label}
            </option>
          )}
        </For>
      </select>
      {(local.error || local?.formHandler?.fieldHasError?.(props.name)) && (
        <div class="invalid-feedback">
          {local.errorMessage ||
            local?.formHandler?.getFieldError?.(props.name)}
        </div>
      )}
    </>
  );
};

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
    local?.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);
    local?.onInput?.(event);
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
    local?.formHandler?.validateField?.(rest.name);
    local?.formHandler?.touchField?.(rest.name);
    local?.onBlur?.(event);
  };

  return (
    <>
      {local.label && <label class="form-label">{local.label}</label>}
      <select
        {...rest}
        classList={{
          ...rest.classList,
          'is-invalid':
            local.error || local?.formHandler?.fieldHasError?.(rest.name),
          'form-select': true,
        }}
        value={rest.value || local?.formHandler?.getFieldValue?.(rest.name)}
        onInput={onInput}
        onBlur={onBlur}
      >
        <For each={local.options}>
          {(option) => (
            <option
              value={option.value}
              selected={
                rest.value == option.value ||
                local?.formHandler?.getFieldValue?.(rest.name) == option.value
              }
            >
              {option.label}
            </option>
          )}
        </For>
      </select>
      {(local.error || local?.formHandler?.fieldHasError?.(rest.name)) && (
        <div class="invalid-feedback">
          {local.errorMessage || local?.formHandler?.getFieldError?.(rest.name)}
        </div>
      )}
    </>
  );
};

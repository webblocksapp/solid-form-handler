import { Component, JSX, For, splitProps } from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface SelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  options?: { value: string | number; label: string }[];
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
    if (typeof local.onInput === 'function') {
      local.onInput(event);
    } else {
      local?.onInput?.[0](local?.onInput?.[1], event);
    }
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
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

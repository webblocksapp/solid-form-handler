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
  ]);

  const onInput: SelectProps['onInput'] = (event) => {
    local?.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value);
    if (typeof props.onInput === 'function') {
      props.onInput(event);
    } else {
      props?.onInput?.[0](props?.onInput?.[1], event);
    }
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
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

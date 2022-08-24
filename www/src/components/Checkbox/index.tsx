import {
  Component,
  createEffect,
  createSignal,
  JSX,
  splitProps,
} from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface CheckboxProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  value?: string | number;
  uncheckedValue?: string | number;
  display?: 'switch' | 'checkbox';
}

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [id, setId] = createSignal<string>();
  const [errorMessage, setErrorMessage] = createSignal<string>();
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'label',
    'onChange',
    'value',
    'display',
    'uncheckedValue',
  ]);

  const onChange: CheckboxProps['onChange'] = (event) => {
    local?.formHandler?.setFieldValue?.(
      rest.name,
      getValue(event.currentTarget.checked)
    );
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  const getValue = (checked: boolean) => {
    if (local.value === undefined) return checked;
    if (checked) return local.value;
    return local.uncheckedValue || '';
  };

  const checked = () => {
    if (rest.checked) return rest.checked;
    if (local.value === undefined)
      return local?.formHandler?.getFieldValue?.(rest.name);
    return local?.formHandler?.getFieldValue?.(rest.name) == local.value;
  };

  createEffect(() => setId(rest.id || rest.name));
  createEffect(() =>
    setErrorMessage(
      local.errorMessage || local?.formHandler?.getFieldError?.(rest.name)
    )
  );

  return (
    <>
      <div
        class="form-check"
        classList={{
          'is-invalid':
            local.error || local?.formHandler?.fieldHasError?.(rest.name),
          'form-switch': local.display === 'switch',
        }}
      >
        <input
          {...rest}
          id={id()}
          type="checkbox"
          classList={{
            ...rest.classList,
            'form-check-input': true,
            'is-invalid':
              local.error || local?.formHandler?.fieldHasError?.(rest.name),
          }}
          checked={checked()}
          onChange={onChange}
          value={local.value}
        />
        {local.label && (
          <label for={id()} class="form-check-label">
            {local.label}
          </label>
        )}
      </div>
      {(local.error || local?.formHandler?.fieldHasError?.(rest.name)) &&
        errorMessage() && <div class="invalid-feedback">{errorMessage()}</div>}
    </>
  );
};

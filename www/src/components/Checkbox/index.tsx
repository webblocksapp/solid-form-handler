import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
} from 'solid-js';
import { FormHandler } from 'solid-form-handler';

export interface CheckboxProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  boolean?: boolean;
  value?: string | number;
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
  props = mergeProps(props, { boolean: true });
  const [id, setId] = createSignal<string>();
  const [errorMessage, setErrorMessage] = createSignal<string>();
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'formHandler',
    'label',
    'boolean',
    'onChange',
  ]);

  const onChange: CheckboxProps['onChange'] = (event) => {
    local?.formHandler?.setFieldValue?.(
      rest.name,
      local.boolean ? event.currentTarget.checked : event.currentTarget.value
    );
    local?.onChange?.(event);
  };

  const checked = () => {
    if (rest.checked) return rest.checked;
    if (local.boolean) return local?.formHandler?.getFieldValue?.(rest.name);
    return local?.formHandler?.getFieldValue?.(rest.name) == rest.value;
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
            local?.error || local?.formHandler?.fieldHasError?.(rest.name),
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

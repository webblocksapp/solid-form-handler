import { FieldProps, Field } from 'solid-form-handler';
import { Component, JSX, Show, splitProps } from 'solid-js';

export type CheckboxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> &
  FieldProps & {
    label?: string;
    display?: 'switch';
    uncheckedValue?: string | number;
  };

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, rest] = splitProps(props, ['classList', 'label', 'display', 'uncheckedValue', 'formHandler']);

  return (
    <Field
      {...props}
      mode="checkbox"
      render={(field) => (
        <div classList={local.classList}>
          <div
            classList={{
              'is-invalid': field.helpers.error,
              'form-check': true,
              'form-switch': local.display === 'switch',
            }}
          >
            <input
              {...rest}
              {...field.props}
              type="checkbox"
              classList={{ 'is-invalid': field.helpers.error, 'form-check-input': true }}
            />
            <Show when={local.label}>
              <label class="form-check-label" for={field.props.id}>
                {local.label}
              </label>
            </Show>
          </div>
          <Show when={field.helpers.error}>
            <div class="invalid-feedback">{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};

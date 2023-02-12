import { Field } from '@lib-components';
import { BaseFieldProps } from '@interfaces';
import { Component, JSX, splitProps } from 'solid-js';

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & BaseFieldProps & { label?: string };

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, ['classList', 'label']);

  return (
    <Field {...rest}>
      {(field) => (
        <div classList={local.classList}>
          {local.label && (
            <label class="form-label" for={field.props.id}>
              {local.label}
            </label>
          )}
          <input
            {...field.props}
            value={field.props.value}
            classList={{ 'is-invalid': field.helpers.error, 'form-control': true }}
          />
          {field.helpers.error && <div class="invalid-feedback">{field.helpers.errorMessage}</div>}
        </div>
      )}
    </Field>
  );
};

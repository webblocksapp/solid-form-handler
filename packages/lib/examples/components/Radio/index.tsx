import { FieldProps } from '@interfaces';
import { Field } from '@lib-components';
import { Component, JSX, splitProps } from 'solid-js';

export type RadioProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> &
  FieldProps & {
    label?: string;
  };

export const Radio: Component<RadioProps> = (props) => {
  const [local, rest] = splitProps(props, ['label', 'classList']);

  return (
    <Field
      {...props}
      mode="radio"
      render={(field) => (
        <div classList={local.classList}>
          <div classList={{ 'form-check': true, 'is-invalid': field.helpers.error }}>
            <input
              {...rest}
              {...field.props}
              classList={{ 'form-check-input': true, 'is-invalid': field.helpers.error }}
              type="radio"
            />
            {local.label && (
              <label class="form-check-label" for={field.props.id}>
                {local.label}
              </label>
            )}
          </div>
          {field.helpers.error && <div class="invalid-feedback">{field.helpers.errorMessage}</div>}
        </div>
      )}
    />
  );
};

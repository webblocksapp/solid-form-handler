import { FieldProps, Field } from 'solid-form-handler';
import { Component, For } from 'solid-js';
import { Radio } from '@example-components';

type SelectableOption = { value: string | number; label: string };

export type RadiosProps = FieldProps & {
  label?: string;
  options?: Array<SelectableOption>;
  value?: string | number;
  triggers?: string[];
};

export const Radios: Component<RadiosProps> = (props) => {
  return (
    <Field
      {...props}
      mode="radio-group"
      render={(field) => (
        <div>
          {props.label && <label>{props.label}</label>}
          <div classList={{ 'is-invalid': field.helpers.error }}>
            <For each={props.options}>
              {(option, i) => (
                <Radio
                  {...field.props}
                  id={`${field.props.id}-${i()}`}
                  label={option.label}
                  value={option.value}
                  error={field.helpers.error}
                  checked={field.helpers.isChecked(option.value)}
                />
              )}
            </For>
          </div>
          {field.helpers.error && <div class="invalid-feedback">{field.helpers.errorMessage}</div>}
        </div>
      )}
    />
  );
};

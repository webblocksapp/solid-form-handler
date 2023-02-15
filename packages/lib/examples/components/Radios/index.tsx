import { FieldProps } from '@interfaces';
import { Component, For, splitProps } from 'solid-js';
import { Radio } from '@components';
import { Field } from '@lib-components';

type SelectableOption = { value: string | number; label: string };

export type RadiosProps = FieldProps & {
  label?: string;
  options?: Array<SelectableOption>;
  value?: string | number;
  triggers?: string[];
};

export const Radios: Component<RadiosProps> = (props) => {
  const [local, rest] = splitProps(props, ['label', 'options']);

  return (
    <Field
      {...rest}
      mode="radio-group"
      render={(field) => (
        <div>
          {local.label && <label>{local.label}</label>}
          <div classList={{ 'is-invalid': field.helpers.error }}>
            <For each={local.options}>
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

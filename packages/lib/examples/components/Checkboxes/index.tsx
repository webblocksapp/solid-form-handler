import { FieldProps } from '@interfaces';
import { Component, For, JSX } from 'solid-js';
import { Checkbox } from '@components';
import { Field } from '@lib-components';

type SelectableOption = { value: string | number; label: string };

export type CheckboxesProps = FieldProps & {
  display?: 'switch';
  label?: string;
  options?: Array<SelectableOption>;
  onChange?: JSX.DOMAttributes<HTMLInputElement>['onChange'];
  onBlur?: JSX.DOMAttributes<HTMLInputElement>['onBlur'];
  value?: Array<string | number>;
  triggers?: string[];
};

export const Checkboxes: Component<CheckboxesProps> = (props) => {
  return (
    <Field
      {...props}
      mode="checkbox-group"
      render={(field) => (
        <div>
          {props.label && <label>{props.label}</label>}
          <div classList={{ 'is-invalid': field.helpers.error }}>
            <For each={props.options}>
              {(option, i) => (
                <Checkbox
                  {...field.props}
                  display={props.display}
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

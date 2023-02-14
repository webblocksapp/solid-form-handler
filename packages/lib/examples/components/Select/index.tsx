import { FieldProps } from '@interfaces';
import { Field } from '@lib-components';
import { Component, createEffect, createSignal, For, JSX, splitProps } from 'solid-js';

type SelectableOption = { value: string | number; label: string };

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> &
  FieldProps & {
    label?: string;
    options?: Array<SelectableOption>;
    placeholder?: string;
  };

export const Select: Component<SelectProps> = (props) => {
  const [local, rest] = splitProps(props, ['placeholder', 'options', 'label', 'classList']);
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(local.placeholder ? [{ value: '', label: local.placeholder }] : []),
      ...(local.options || []),
    ]);
  });

  return (
    <Field<{ props: typeof rest }>
      {...rest}
      mode="input"
      render={(field) => (
        <div classList={local.classList}>
          {local.label && (
            <label class="form-label" for={field.props.id}>
              {local.label}
            </label>
          )}
          <select {...field.props} classList={{ 'is-invalid': field.helpers.error, 'form-select': true }}>
            <For each={options()}>
              {(option) => (
                <option value={option.value} selected={option.value == field.props.value}>
                  {option.label}
                </option>
              )}
            </For>
          </select>
          {field.helpers.error && <div class="invalid-feedback">{field.helpers.errorMessage}</div>}
        </div>
      )}
    />
  );
};

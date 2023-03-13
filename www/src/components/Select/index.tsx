import { FieldProps, Field } from 'solid-form-handler';
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  Show,
  splitProps,
} from 'solid-js';

type SelectableOption = { value: string | number; label: string };

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> &
  FieldProps & {
    label?: string;
    options?: Array<SelectableOption>;
    placeholder?: string;
  };

export const Select: Component<SelectProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'placeholder',
    'options',
    'label',
    'classList',
    'class',
    'formHandler',
  ]);
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
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <div class={local.class} classList={local.classList}>
          <Show when={local.label}>
            <label class="form-label" for={field.props.id}>
              {local.label}
            </label>
          </Show>
          <select
            {...rest}
            {...field.props}
            class="form-select"
            classList={{ 'is-invalid': field.helpers.error }}
          >
            <For each={options()}>
              {(option) => (
                <option
                  value={option.value}
                  selected={option.value == field.props.value}
                >
                  {option.label}
                </option>
              )}
            </For>
          </select>
          <Show when={field.helpers.error}>
            <div class="invalid-feedback">{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};

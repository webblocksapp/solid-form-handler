const n=`import { FieldProps, Field } from 'solid-form-handler';
import { Component, For, Show } from 'solid-js';

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
          <Show when={props.label}>
            <label>{props.label}</label>
          </Show>
          <div classList={{ 'is-invalid': field.helpers.error }}>
            <For each={props.options}>
              {(option, i) => (
                <div
                  classList={{
                    'form-check': true,
                    'is-invalid': field.helpers.error,
                  }}
                >
                  <input
                    {...field.props}
                    id={\`\${field.props.id}-\${i()}\`}
                    checked={field.helpers.isChecked(option.value)}
                    value={option.value}
                    class="form-check-input"
                    classList={{ 'is-invalid': field.helpers.error }}
                    type="radio"
                  />
                  <Show when={option.label}>
                    <label
                      class="form-check-label"
                      for={\`\${field.props.id}-\${i()}\`}
                    >
                      {option.label}
                    </label>
                  </Show>
                </div>
              )}
            </For>
          </div>
          <Show when={field.helpers.error}>
            <div class="invalid-feedback">{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
`;export{n as default};
//# sourceMappingURL=index-09b5006f.js.map

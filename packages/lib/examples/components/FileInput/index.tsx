import { Field } from 'solid-form-handler';
import { Component, Show, splitProps } from 'solid-js';
import { TextInputProps } from '@example-components';

export type FileInputProps = Omit<TextInputProps, 'type' | 'value'> &
  ({ multiple?: false; value?: File } | { multiple?: true; value?: File[] });

export const FileInput: Component<FileInputProps> = (props) => {
  let fileInputRef: HTMLInputElement;
  const [local, rest] = splitProps(props, ['classList', 'label', 'formHandler', 'multiple', 'value']);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <div classList={local.classList}>
          <Show when={local.label}>
            <label class="form-label" for={field.props.id}>
              {local.label}
            </label>
          </Show>
          <input
            ref={fileInputRef}
            type="file"
            classList={{ 'd-none': true }}
            onChange={(event) => {
              const fileField = event.target as HTMLInputElement;
              const files = fileField.files || [];
              field.helpers.onValueChange(local.multiple ? files : files[0]);
            }}
          />
          <button
            onBlur={field.props.onBlur}
            classList={{ 'is-invalid': field.helpers.error }}
            type="button"
            class="form-control bg-light file-btn d-flex p-0 overflow-hidden"
            onClick={() => fileInputRef?.click()}
          >
            <span class="p-2 border-end">Choose File</span>
            <span class="p-2">
              <Show when={local.multiple && field.props.value.length} fallback={field.props.value.name}>
                {field.props.value.length} files chosen.
              </Show>
            </span>
          </button>
          <Show when={field.helpers.error}>
            <div class="invalid-feedback">{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};

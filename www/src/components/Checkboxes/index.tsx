import { Component, createEffect, createSignal, For, JSX } from 'solid-js';
import { FormHandler } from 'solid-form-handler';
import { Checkbox } from '@components';

export interface CheckboxesProps {
  classList?: JSX.CustomAttributes<HTMLDivElement>['classList'];
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  id?: string;
  label?: string;
  name?: string;
  options?: { value: string | number; label: string }[];
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
  value?: Array<string | number>;
}

export const Checkboxes: Component<CheckboxesProps> = (props) => {
  const [id, setId] = createSignal<string>();

  const onChange: CheckboxesProps['onChange'] = (event) => {
    if (event.currentTarget.checked) {
      props?.formHandler?.setFieldValue?.(props.name, [
        ...props?.formHandler?.getFieldValue?.(props.name),
        event.currentTarget.value,
      ]);
    } else {
      props?.formHandler?.setFieldValue?.(
        props.name,
        props?.formHandler
          ?.getFieldValue?.(props.name)
          ?.filter?.((item: any) => event.currentTarget.value != item)
      );
    }
    props?.onChange?.(event);
  };

  const checked = (value: string | number) => {
    return (
      props?.value?.some?.((item: any) => item == value) ||
      props?.formHandler
        ?.getFieldValue?.(props.name)
        ?.some?.((item: any) => item == value)
    );
  };

  createEffect(() => setId(props.id || props.name));

  return (
    <>
      {props.label && <label class="form-label">{props.label}</label>}
      <For each={props.options}>
        {(option, i) => (
          <Checkbox
            id={`${id()}-${i()}`}
            error={
              props.error || props.formHandler?.fieldHasError?.(props.name)
            }
            boolean={false}
            label={option.label}
            value={option.value}
            onChange={onChange}
            checked={checked(option.value)}
          />
        )}
      </For>
      {(props.error || props?.formHandler?.fieldHasError?.(props.name)) && (
        <div class="invalid-feedback">
          {props.errorMessage ||
            props?.formHandler?.getFieldError?.(props.name)}
        </div>
      )}
    </>
  );
};

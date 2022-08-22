import { Component, createEffect, createSignal, For, JSX } from 'solid-js';
import { FormHandler } from 'solid-form-handler';
import { Radio } from '@components';

export interface RadiosProps {
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
  value?: string | number;
}

export const Radios: Component<RadiosProps> = (props) => {
  const [id, setId] = createSignal<string>();

  const onChange: RadiosProps['onChange'] = (event) => {
    props?.formHandler?.setFieldValue?.(props.name, event.currentTarget.value);
    props?.onChange?.(event);
  };

  createEffect(() => setId(props.id || props.name));

  return (
    <>
      {props.label && <label class="form-label">{props.label}</label>}
      <For each={props.options}>
        {(option, i) => (
          <Radio
            id={`${id()}-${i()}`}
            name={props.name}
            label={option.label}
            value={option.value}
            onChange={onChange}
            error={
              props.error || props.formHandler?.fieldHasError?.(props.name)
            }
            checked={
              option.value == props.value ||
              option.value == props?.formHandler?.getFieldValue(props.name)
            }
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

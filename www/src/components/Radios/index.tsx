import { Component, createEffect, createSignal, For, JSX } from 'solid-js';
import { FormHandler } from 'solid-form-handler';

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
          <div
            classList={{
              ...props.classList,
              'is-invalid':
                props.error || props?.formHandler?.fieldHasError?.(props.name),
              'form-check': true,
            }}
          >
            <input
              class="form-check-input"
              id={id() && `${id()}-${i()}`}
              type="radio"
              value={option.value}
              classList={{
                'is-invalid':
                  props.error ||
                  props?.formHandler?.fieldHasError?.(props.name),
              }}
              name={props.name}
              checked={
                props.value == option.value ||
                props?.formHandler?.getFieldValue?.(props.name) == option.value
              }
              onChange={onChange}
            />
            <label for={id() && `${id()}-${i()}`} class="form-check-label">
              {option.label}
            </label>
          </div>
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

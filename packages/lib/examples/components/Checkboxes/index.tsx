import { FormHandler } from '@interfaces';
import { Component, createEffect, createSelector, For, JSX, splitProps } from 'solid-js';
import { Checkbox } from '@components';
import { createStore } from 'solid-js/store';

type SelectableOption = { value: string | number; label: string };

export interface CheckboxesProps {
  display?: 'switch';
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  id?: string;
  label?: string;
  options?: Array<SelectableOption>;
  name?: string;
  onChange?: JSX.DOMAttributes<HTMLInputElement>['onChange'];
  onBlur?: JSX.DOMAttributes<HTMLInputElement>['onBlur'];
  value?: Array<string | number>;
  triggers?: string[];
}

export const Checkboxes: Component<CheckboxesProps> = (props) => {
  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining props from the interface.
   */
  const [local, rest] = splitProps(props, ['error', 'errorMessage', 'id', 'onChange', 'onBlur']);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    value: [],
    id: '',
  });

  /**
   * Checkbox is checked
   */
  const checked = createSelector(
    () => store.value,
    (optionValue: string | number, storeValue) => storeValue?.some?.((item) => item == optionValue)
  );

  /**
   * Checkboxes onChange logic.
   */
  const onChange: CheckboxesProps['onChange'] = (event) => {
    //If checked, value is pushed inside form handler.
    if (event.currentTarget.checked) {
      rest.formHandler?.setFieldValue?.(rest.name, [...store.value, event.currentTarget.value], {
        validateOn: [event.type],
      });

      //If unchecked, value is filtered from form handler.
    } else {
      rest.formHandler?.setFieldValue?.(
        rest.name,
        store.value?.filter?.((item: any) => event.currentTarget.value != item)
      );
    }

    //onChange prop is preserved
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  /**
   * Checkboxes onBlur event.
   */
  const onBlur: CheckboxesProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    rest.formHandler?.validateField?.(rest.name, { validateOn: [event.type] });
    rest.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('errorMessage', local.errorMessage || rest.formHandler?.getFieldError?.(rest.name) || '');
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore('error', local.error || rest.formHandler?.fieldHasError?.(rest.name) || false);
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || rest.name || '');
  });

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
    setStore('value', rest.formHandler ? rest.formHandler?.getFieldValue?.(rest.name) : rest.value);
  });

  /**
   * Initializes the form field default value.
   */
  createEffect(() => {
    rest.formHandler?.setFieldDefaultValue(rest.name, rest.value);
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    rest?.formHandler?.setFieldTriggers?.(rest.name, rest.triggers);
  });

  return (
    <div>
      {rest.label && <label>{rest.label}</label>}
      <div classList={{ 'is-invalid': store.error }}>
        <For each={rest.options}>
          {(option, i) => (
            <Checkbox
              display={rest.display}
              id={`${store.id}-${i()}`}
              label={option.label}
              value={option.value}
              name={rest.name}
              onChange={onChange}
              onBlur={onBlur}
              error={store.error}
              checked={checked(option.value)}
            />
          )}
        </For>
      </div>
      {store.error && <div class="invalid-feedback">{store.errorMessage}</div>}
    </div>
  );
};

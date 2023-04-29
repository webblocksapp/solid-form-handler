import { CommonEvent, CommonFieldProps, FieldStore, SetFieldValueOptions } from '@interfaces';
import { Component, createEffect, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useFieldContext } from '@hocs';

type FileInputFieldPropKey = keyof FileInputFieldStore['props'];
type FileInputFieldStore = Omit<FieldStore, 'props' | 'helpers'> & {
  props: FieldStore['props'] & {
    onChange?: CommonEvent;
  };
  helpers: Omit<FieldStore['helpers'], 'onValueChange'> & {
    getPropsExcept: (keys: FileInputFieldPropKey[]) => Pick<FileInputFieldStore['props'], FileInputFieldPropKey>;
    onValueChange: (files: FileList | never[], options?: SetFieldValueOptions) => void;
  };
};

export type FileInputFieldProps = CommonFieldProps & {
  mode: 'file-input';
  htmlElement?: () => Element;
  multiple?: boolean;
  onChange?: CommonEvent;
  onChangeOptions?: SetFieldValueOptions;
  render: (field: FileInputFieldStore) => JSXElement;
};

export const FileInputField: Component<FileInputFieldProps> = (props) => {
  let htmlElement: HTMLElement;
  const { baseStore } = useFieldContext();

  /**
   * Helper method for setting the value to the form handler if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (fileList: FileList | null, options?: SetFieldValueOptions) => {
    const files = [...(fileList || [])];
    const value = props.multiple ? files : files[0];
    props.formHandler?.setFieldValue?.(props.name, value, options);
  };

  /**
   * Extended onChange event.
   */
  const onChange: FileInputFieldProps['onChange'] = (event) => {
    const fileField = event.currentTarget as HTMLInputElement;
    const fileList = fileField.files;
    htmlElement = event.currentTarget;

    //Form handler prop sets and validate the value onChange.
    onValueChange(
      fileList,
      mergeProps({ htmlElement: event.currentTarget, validateOn: [event.type] }, props.onChangeOptions)
    );

    //onChange prop is preserved
    if (typeof props.onChange === 'function') {
      props.onChange(event);
    } else {
      props.onChange?.[0](props.onChange?.[1], event);
    }
  };

  /**
   * Helper function for removing unneeded props.
   */
  const getPropsExcept = (keys: FileInputFieldPropKey[]) => {
    const [_, rest] = splitProps(store.props, keys);
    return rest;
  };

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
    setStore('props', 'value', props.formHandler ? props.formHandler?.getFieldValue?.(props.name) : props.value);
  });

  /**
   * Initializes component's default value
   */
  createEffect(() => {
    props.formHandler?.setFieldDefaultValue?.(props.name, props.value);
  });

  /**
   * Resets file field value.
   */
  createEffect(() => {
    if (props.formHandler?.formIsResetting?.() !== true) return;
    const el = (props.htmlElement?.() || htmlElement) as HTMLInputElement;
    if (el) el.value = '';
  });

  const [store, setStore] = createStore(baseStore as unknown as FileInputFieldStore);
  setStore('props', 'onChange', () => onChange);
  setStore('helpers', 'onValueChange', () => onValueChange);
  setStore('helpers', 'getPropsExcept', () => getPropsExcept);

  return props.render(store);
};

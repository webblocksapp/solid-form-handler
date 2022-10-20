//@ts-nocheck
import { Component, JSX, onCleanup } from 'solid-js';

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  /*...*/
  formHandler?: FormHandler;
  /*...*/
}

export const TextInput: Component<TextInputProps> = (props) => {
  /*...*/

  onCleanup(() => {
    props.formHandler?.unmountField?.(props.name);
  });

  /*...*/
};

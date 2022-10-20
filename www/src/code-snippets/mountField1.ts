//@ts-nocheck
import { Component, JSX, onMount } from 'solid-js';

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  /*...*/
  formHandler?: FormHandler;
  /*...*/
}

export const TextInput: Component<TextInputProps> = (props) => {
  /*...*/

  onMount(() => {
    props.formHandler?.mountField?.(props.name);
  });

  /*...*/
};

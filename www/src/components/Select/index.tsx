import { Component, JSX } from 'solid-js';

export interface SelectProps extends JSX.HTMLAttributes<HTMLSelectElement> {}

export const Select: Component<SelectProps> = (props) => {
  return <select {...props} />;
};

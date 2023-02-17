import { Component, JSXElement } from 'solid-js';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Bootstrap5Theme: Component<{ children: JSXElement }> = (props) => {
  return props.children;
};

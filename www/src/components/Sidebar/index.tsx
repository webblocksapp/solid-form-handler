import { Component, JSX, JSXElement, mergeProps } from 'solid-js';
import './index.css';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
}

export const Sidebar: Component<SidebarProps> = (props) => {
  props = mergeProps(
    { classList: { sidebar: true, ...props.classList } },
    props
  );

  return <div {...props} class="sidebar" />;
};

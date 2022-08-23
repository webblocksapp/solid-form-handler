import { Component, JSX, JSXElement, mergeProps } from 'solid-js';
import './index.css';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
}

export const Sidebar: Component<SidebarProps> = ({ classList, ...props }) => {
  props = mergeProps({ classList: { sidebar: true, ...classList } }, props);

  return <div {...props} />;
};

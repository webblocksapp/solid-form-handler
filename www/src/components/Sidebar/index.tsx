import { Component, JSX, JSXElement, splitProps } from 'solid-js';
import { useSidebarContext } from '@components';
import './index.css';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
}

export const Sidebar: Component<SidebarProps> = (props) => {
  const [local, rest] = splitProps(props, ['classList']);
  const sidebar = useSidebarContext();

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        sidebar: true,
        show: sidebar?.open?.() === true,
      }}
    />
  );
};

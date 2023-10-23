const e=`import {
  Component,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { useSidebarContext } from '@components';
import './index.css';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
}

export const Sidebar: Component<SidebarProps> = (props) => {
  const [local, rest] = splitProps(props, ['classList']);
  const [overSidebar, setOverSidebar] = createSignal(false);
  const sidebar = useSidebarContext();
  let ref: HTMLDivElement | undefined;
  let body: HTMLBodyElement | undefined;

  const onMouseEnter = () => {
    setOverSidebar(true);
  };

  const onMouseLeave = () => {
    setOverSidebar(false);
  };

  const closeSidebar = () => {
    sidebar?.close?.();
  };

  createEffect(() => {
    overSidebar()
      ? body?.removeEventListener('click', closeSidebar)
      : body?.addEventListener('click', closeSidebar);
  });

  onMount(() => {
    body = document.getElementsByTagName('body')[0];
    body?.addEventListener('click', closeSidebar);
    ref?.addEventListener('mouseenter', onMouseEnter);
    ref?.addEventListener('mouseleave', onMouseLeave);
  });

  onCleanup(() => {
    ref?.removeEventListener('mouseEnter', onMouseEnter);
    ref?.removeEventListener('mouseleave', onMouseLeave);
  });

  return (
    <div
      {...rest}
      ref={ref}
      classList={{
        ...local.classList,
        sidebar: true,
        show: sidebar?.active?.() === true,
      }}
    />
  );
};
`;export{e as default};

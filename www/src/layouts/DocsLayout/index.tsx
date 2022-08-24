import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import { Outlet, useRouteData } from '@solidjs/router';
import { Sidebar, TreeMenu } from '@components';
import { TreeMenu as TreeMenuType, ResizeObserver } from '@interfaces';
import { resizeObserver } from '@utils';
import './index.css';

export interface DocsLayoutProps {
  headerText?: string;
  menu?: TreeMenuType[];
}

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  const { headerText, menu } = useRouteData<DocsLayoutProps>();
  const [scrollTopOffset, setScrollTopOffset] = createSignal<number>();
  let contentRef: HTMLDivElement | undefined;
  let contentResizeObserver: ResizeObserver | undefined;

  onMount(() => {
    contentResizeObserver = resizeObserver(contentRef).observe('target', () => {
      setScrollTopOffset(
        contentRef && contentRef.getBoundingClientRect().y + window.scrollY - 56
      );
    });
  });

  onCleanup(() => {
    contentResizeObserver?.unobserve();
  });

  return (
    <div class="docs-layout container-fluid px-0">
      <div class="border-bottom bg-primary">
        <div class="container-lg">
          <div class="py-4">
            <h3 class="text-white mb-0">{props.headerText || headerText}</h3>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="container-lg">
          <div>
            <Sidebar classList={{ offset: true }}>
              <TreeMenu menu={menu} scrollTopOffset={scrollTopOffset()} />
            </Sidebar>
          </div>
          <div ref={contentRef} class="bg-white p-4 ps-5 pt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

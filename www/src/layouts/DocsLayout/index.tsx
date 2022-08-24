import { Component, createEffect } from 'solid-js';
import { Outlet, useRouteData, useLocation } from '@solidjs/router';
import { Sidebar, TreeMenu } from '@components';
import { TreeMenu as TreeMenuType } from '@interfaces';
import './index.css';

export interface DocsLayoutProps {
  headerText?: string;
  menu?: TreeMenuType[];
}

const DOCS_SCROLL_TOP_OFFSET = 80;

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  const { headerText, menu } = useRouteData<DocsLayoutProps>();
  const location = useLocation();

  createEffect(
    () => location.pathname && window.scrollTo({ top: DOCS_SCROLL_TOP_OFFSET })
  );

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
              <TreeMenu menu={menu} noScroll={true} />
            </Sidebar>
          </div>
          <div class="bg-white p-4 ps-5 pt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

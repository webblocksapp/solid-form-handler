import { Component } from 'solid-js';
import { Outlet, useRouteData } from 'solid-app-router';
import { Sidebar, TreeMenu } from '@components';
import { SIDEBAR_MENU } from '@constants';
import './index.css';

export interface DocsLayoutProps {
  headerText?: string;
}

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  const { headerText } = useRouteData<DocsLayoutProps>();

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
          <Sidebar class="py-4 pe-4">
            <TreeMenu menu={SIDEBAR_MENU} />
          </Sidebar>
          <div class="bg-white p-4 ps-5 pt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

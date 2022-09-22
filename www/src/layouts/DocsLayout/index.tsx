import { Component } from 'solid-js';
import { Outlet, useRouteData } from '@solidjs/router';
import { Sidebar, TreeMenu } from '@components';
import { TreeMenu as TreeMenuType } from '@interfaces';
import './index.css';
import { flattenTree } from '@utils';

export interface DocsLayoutProps {
  headerText?: string;
  menu?: TreeMenuType[];
}

export const DocsLayout: Component<DocsLayoutProps> = () => {
  const { menu } = useRouteData<DocsLayoutProps>();
  const flattenedMenu = flattenTree(menu);

  console.log(flattenedMenu);

  return (
    <div class="docs-layout container-fluid px-0">
      <div class="main">
        <div class="container-lg">
          <div>
            <Sidebar>
              <TreeMenu menu={menu} />
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

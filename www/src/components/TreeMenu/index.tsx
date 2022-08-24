import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { TreeMenu as TreeMenuType } from '@interfaces';
import { NavLink } from '@solidjs/router';
import './index.css';

export interface TreeMenuProps {
  menu?: TreeMenuType[];
  noScroll?: boolean;
}

export const TreeMenu: Component<TreeMenuProps> = (props) => {
  const [menu] = createStore<TreeMenuType[]>(props.menu || []);

  return (
    <ul class="tree-menu nav flex-column">
      <For each={menu}>
        {(item) => (
          <>
            <li class="nav-item">
              {item.route ? (
                <NavLink
                  class={`px-0 nav-link ${item.section && 'section-item'}`}
                  href={item.route}
                  noScroll={props.noScroll}
                >
                  {item.text}
                </NavLink>
              ) : (
                <span
                  class="px-0 nav-link"
                  classList={{ 'section-item': item.section }}
                >
                  {item.text}
                </span>
              )}
            </li>
            {item.children && (
              <TreeMenu menu={item.children} noScroll={props.noScroll} />
            )}
          </>
        )}
      </For>
    </ul>
  );
};

const n=`import { Component, For } from 'solid-js';
import { MenuItem } from '@interfaces';
import { NavLink } from '@solidjs/router';
import { useSidebarContext } from '@components';
import './index.css';

export interface TreeMenuProps {
  menu?: MenuItem[];
  noScroll?: boolean;
  onChange?: (data: { index: number; menuItem: MenuItem }) => void;
}

export const SidebarMenu: Component<TreeMenuProps> = (props) => {
  const sidebar = useSidebarContext();

  return (
    <ul class="sidebar-menu nav flex-column">
      <For each={props.menu}>
        {(item, i) => (
          <>
            <li class="nav-item">
              {item.route ? (
                <NavLink
                  classList={{
                    'px-0': true,
                    'nav-link': true,
                    'section-item': item.section,
                  }}
                  href={item.route}
                  noScroll={props.noScroll}
                  onClick={() => {
                    sidebar?.close?.();
                    props.onChange?.({ index: i(), menuItem: item });
                  }}
                >
                  {item.text}{' '}
                  {item.section && (
                    <i class="fa fa-link" aria-hidden="true"></i>
                  )}
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
          </>
        )}
      </For>
    </ul>
  );
};
`;export{n as default};

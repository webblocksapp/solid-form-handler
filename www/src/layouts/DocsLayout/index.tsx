import { Component, createSignal, onMount } from 'solid-js';
import {
  Outlet,
  useLocation,
  useNavigate,
  useRouteData,
} from '@solidjs/router';
import {
  AdBlockVertical,
  Sidebar,
  SidebarMenu,
  useSidebarContext,
} from '@components';
import { Size, TreeMenuItem } from '@interfaces';
import { flattenTree } from '@utils';
import './index.css';

export interface DocsLayoutProps {
  headerText?: string;
  menu?: TreeMenuItem[];
  menuOffset?: number;
  size?: Size;
}

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = createSignal<number>(0);
  const sidebar = useSidebarContext();

  const { menu, menuOffset } = useRouteData<DocsLayoutProps>();
  const sidebarMenu = flattenTree(menu);

  const onSidebarMenuChange = (index: number) => {
    setIndex(index);
  };

  const prev = () => {
    if (index() === 0) return;

    const prevIndex = index() - 1;
    const prevRoute = sidebarMenu[prevIndex].route;
    setIndex(prevIndex);

    if (prevRoute) {
      navigate(prevRoute);
    } else {
      prev();
    }
  };

  const next = () => {
    if (index() === sidebarMenu.length - 1) return;

    const nextIndex = index() + 1;
    const nextRoute = sidebarMenu[index() + 1].route;
    setIndex(nextIndex);

    if (nextRoute) {
      navigate(nextRoute);
    } else {
      next();
    }
  };

  onMount(() => {
    const initialIndex = menuOffset || 0;
    const foundIndex = sidebarMenu.findIndex(
      (item) => item.route && item.route === location.pathname.split('/').pop()
    );

    setIndex(foundIndex > -1 ? foundIndex : initialIndex);
  });

  return (
    <div class="docs-layout container-fluid px-0">
      <div class={`container-${props.size || 'fluid'}`}>
        <div>
          <Sidebar>
            <SidebarMenu
              onChange={({ index }) => onSidebarMenuChange(index)}
              menu={sidebarMenu}
            />
          </Sidebar>
        </div>
        <div class="bg-white">
          <div class="docs-content">
            <div class="position-relative">
              <button
                class="toggle-sidebar btn bg-primary text-white"
                onClick={() => sidebar?.toggle?.()}
              >
                {sidebar?.active() && (
                  <i class="fa fa-caret-square-o-left" aria-hidden="true"></i>
                )}
                {!sidebar?.active() && (
                  <i class="fa fa-caret-square-o-right" aria-hidden="true"></i>
                )}
              </button>
              {<Outlet />}
            </div>
            <div>
              <div class="d-flex justify-content-end mt-3">
                {index() > (menuOffset || 0) && (
                  <button class="btn bg-primary text-white" onClick={prev}>
                    <i class="bi bi-chevron-left"></i> Back
                  </button>
                )}
                {index() < sidebarMenu.length - 1 && (
                  <button class="btn bg-primary text-white ms-3" onClick={next}>
                    Next <i class="bi bi-chevron-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <aside class="add-wrapper">
            <AdBlockVertical />
          </aside>
        </div>
      </div>
    </div>
  );
};

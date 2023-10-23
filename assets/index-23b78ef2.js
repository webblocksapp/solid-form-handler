const index = "import { Component, For } from 'solid-js';\nimport { MenuItem } from '@interfaces';\nimport { NavLink } from '@solidjs/router';\nimport { useSidebarContext } from '@components';\nimport './index.css';\n\nexport interface TreeMenuProps {\n  menu?: MenuItem[];\n  noScroll?: boolean;\n  onChange?: (data: { index: number; menuItem: MenuItem }) => void;\n}\n\nexport const SidebarMenu: Component<TreeMenuProps> = (props) => {\n  const sidebar = useSidebarContext();\n\n  return (\n    <ul class=\"sidebar-menu nav flex-column\">\n      <For each={props.menu}>\n        {(item, i) => (\n          <>\n            <li class=\"nav-item\">\n              {item.route ? (\n                <NavLink\n                  classList={{\n                    'px-0': true,\n                    'nav-link': true,\n                    'section-item': item.section,\n                  }}\n                  href={item.route}\n                  noScroll={props.noScroll}\n                  onClick={() => {\n                    sidebar?.close?.();\n                    props.onChange?.({ index: i(), menuItem: item });\n                  }}\n                >\n                  {item.text}{' '}\n                  {item.section && (\n                    <i class=\"fa fa-link\" aria-hidden=\"true\"></i>\n                  )}\n                </NavLink>\n              ) : (\n                <span\n                  class=\"px-0 nav-link\"\n                  classList={{ 'section-item': item.section }}\n                >\n                  {item.text}\n                </span>\n              )}\n            </li>\n          </>\n        )}\n      </For>\n    </ul>\n  );\n};\n";

export { index as default };

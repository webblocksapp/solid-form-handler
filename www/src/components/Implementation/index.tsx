import { Code, CodeTabs, Tabs } from '@components';
import {
  Component,
  createSignal,
  JSXElement,
  mergeProps,
  Switch,
  Match,
} from 'solid-js';
import { CodeTab } from '@interfaces';

export interface ImplementationProps {
  code?: string;
  codeTabs?: CodeTab[];
  children?: JSXElement;
  language?: string;
  class?: string;
}

export const Implementation: Component<ImplementationProps> = (props) => {
  props = mergeProps({ language: 'tsx' }, props);

  return (
    <Tabs
      class={props.class}
      tabs={[
        {
          text: 'Preview',
          children: <div class="p-2">{props.children}</div>,
        },
        {
          text: 'Code',
          children: (
            <Switch>
              <Match when={props.code !== undefined}>
                <Code
                  codeClass="m-0 border-0"
                  language={props.language}
                  content={props.code}
                />
              </Match>
              <Match when={props.codeTabs !== undefined}>
                <CodeTabs
                  class="m-0"
                  tabs={props.codeTabs || []}
                  border={false}
                />
              </Match>
            </Switch>
          ),
        },
      ]}
    />
  );
};

import { Code } from '@components';
import { Component, createSignal, Switch, Match, JSXElement, mergeProps } from 'solid-js';

export interface ImplementationProps {
  code?: string | Promise<string | undefined>;
  children?: JSXElement;
  language?: string;
}

export const Implementation: Component<ImplementationProps> = (props) => {
  props = mergeProps({ language: 'typescript' }, props);
  const [tabIndex, setTabIndex] = createSignal<number>(0);

  return (
    <>
      <ul class="nav nav-tabs d-flex justify-content-end">
        <li class="nav-item">
          <a class="nav-link" href="#" classList={{ active: tabIndex() === 0 }} onClick={() => setTabIndex(0)}>
            Preview
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" classList={{ active: tabIndex() === 1 }} onClick={() => setTabIndex(1)}>
            Code
          </a>
        </li>
      </ul>
      <div class="border border-top-0">
        <Switch>
          <Match when={tabIndex() === 0}>
            <div class="p-2">{props.children}</div>
          </Match>
          <Match when={tabIndex() === 1}>
            <Code class="m-0 bg-light p-3" language={props.language} content={props.code} />
          </Match>
        </Switch>
      </div>
    </>
  );
};

import { Component, createSignal, onMount, Switch, Match, JSXElement } from 'solid-js';

export interface ImplementationProps {
  code?: string | Promise<string | undefined>;
  children?: JSXElement;
}

export const Implementation: Component<ImplementationProps> = (props) => {
  const [tabIndex, setTabIndex] = createSignal<number>(0);
  const [code, setCode] = createSignal<string>();

  onMount(async () => {
    setCode(await props.code);
  });

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
      <div class="border border-top-0 p-2">
        <Switch>
          <Match when={tabIndex() === 0}>{props.children}</Match>
          <Match when={tabIndex() === 1}>
            <code>
              <pre>{code()}</pre>
            </code>
          </Match>
        </Switch>
      </div>
    </>
  );
};

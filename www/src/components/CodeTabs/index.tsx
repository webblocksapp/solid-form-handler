import { Code } from '@components';
import { CodeTab } from '@interfaces';
import { Component, createSignal, For, mergeProps } from 'solid-js';
import './index.css';

export interface CodeTabsProps {
  tabs: CodeTab[];
  border?: boolean;
  class?: string;
}

export const CodeTabs: Component<CodeTabsProps> = (props) => {
  const [tabIndex, setTabIndex] = createSignal<number>(0);
  props = mergeProps({ class: 'my-3' }, props);

  return (
    <div class={props.class} classList={{ 'code-tabs': true }}>
      <ul class="nav nav-tabs d-flex justify-content-end ps-2 pe-2 pt-2">
        <For each={props.tabs}>
          {(tab, index) => (
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                classList={{ active: tabIndex() === index() }}
                onClick={() => setTabIndex(index())}
              >
                {tab.name}
              </a>
            </li>
          )}
        </For>
      </ul>
      <div
        classList={{
          border: props.border === undefined,
          'border-top-0': props.border === undefined,
        }}
      >
        <For each={props.tabs}>
          {(tab, index) => (
            <Code
              codeClass="m-0 border-0"
              classList={{
                'd-none': tabIndex() !== index(),
                'd-block': tabIndex() === index(),
              }}
              language={tab.language || 'tsx'}
              content={tab.code}
            />
          )}
        </For>
      </div>
    </div>
  );
};

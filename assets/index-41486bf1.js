const n=`import { Code, Tabs } from '@components';
import { CodeTab, Tab } from '@interfaces';
import {
  Component,
  createEffect,
  createSignal,
  For,
  mergeProps,
} from 'solid-js';
import './index.css';

export interface CodeTabsProps {
  tabs: CodeTab[];
  border?: boolean;
  class?: string;
}

export const CodeTabs: Component<CodeTabsProps> = (props) => {
  const [tabIndex, setTabIndex] = createSignal<number>(0);
  const [tabs, setTabs] = createSignal<Tab[]>([]);
  props = mergeProps({ class: 'my-3' }, props);

  createEffect(() => {
    setTabs(() => props.tabs.map((item) => ({ text: item.name })));
  });

  return (
    <div class={props.class} classList={{ 'code-tabs': true }}>
      <Tabs tabs={tabs()} onChange={(index) => setTabIndex(index)} />
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
`;export{n as default};

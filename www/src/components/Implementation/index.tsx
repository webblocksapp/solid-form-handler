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
}

export const Implementation: Component<ImplementationProps> = (props) => {
  props = mergeProps({ language: 'tsx' }, props);
  const [tabIndex, setTabIndex] = createSignal<number>(0);

  return (
    <>
      <Tabs
        tabs={[{ text: 'Preview' }, { text: 'Code' }]}
        onChange={(index) => setTabIndex(index)}
      />
      <div class="border border-top-0">
        <div
          class="p-2"
          classList={{
            'd-none': tabIndex() !== 0,
            'd-block': tabIndex() === 0,
          }}
        >
          {props.children}
        </div>
        <Switch>
          <Match when={props.code !== undefined}>
            <Code
              codeClass="m-0 border-0"
              classList={{
                'd-none': tabIndex() !== 1,
                'd-block': tabIndex() === 1,
              }}
              language={props.language}
              content={props.code}
            />
          </Match>
          <Match when={props.codeTabs !== undefined}>
            <div
              classList={{
                'd-none': tabIndex() !== 1,
                'd-block': tabIndex() === 1,
              }}
            >
              <CodeTabs
                class="m-0"
                tabs={props.codeTabs || []}
                border={false}
              />
            </div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

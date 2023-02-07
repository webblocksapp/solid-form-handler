import {
  Component,
  createSignal,
  For,
  JSXElement,
  Show,
  JSX,
  splitProps,
  createEffect,
} from 'solid-js';
import './index.css';

export interface TabsProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: Array<{ text: string; children?: JSXElement }>;
  onChange?: (index: number) => void;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [tabIndex, setTabIndex] = createSignal<number>(0);
  const [hasChildren, setHasChildren] = createSignal<boolean>(false);
  const [local, rest] = splitProps(props, ['tabs', 'onChange']);

  createEffect(() => {
    setHasChildren(props.tabs.some((tab) => Boolean(tab.children)));
  });

  return (
    <div class="tabs-wrapper" {...rest} classList={{ 'mb-4': hasChildren() }}>
      <div class="tabs d-flex overflow-auto">
        <div class="nav nav-tabs flex-grow-1 d-flex justify-content-end ps-2 pe-2 pt-2">
          <For each={local.tabs}>
            {(tab, index) => (
              <div class="nav-item">
                <span
                  class="nav-link"
                  classList={{ active: tabIndex() === index() }}
                  onClick={() => {
                    setTabIndex(index());
                    local.onChange?.(index());
                  }}
                >
                  {tab.text}
                </span>
              </div>
            )}
          </For>
        </div>
      </div>
      <Show when={hasChildren()}>
        <div class="tab-content border border-top-0">
          <For each={props.tabs}>
            {(tab, i) => (
              <div
                classList={{
                  'd-none': tabIndex() !== i(),
                  'd-block': tabIndex() === i(),
                }}
              >
                {tab.children}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

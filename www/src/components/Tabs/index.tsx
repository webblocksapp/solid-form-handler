import { Component, createSignal, For } from 'solid-js';
import './index.css';

export interface TabsProps {
  tabs: Array<{ text: string }>;
  onChange?: (index: number) => void;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [tabIndex, setTabIndex] = createSignal<number>(0);

  return (
    <div class="tabs d-flex overflow-auto">
      <div class="nav nav-tabs flex-grow-1 d-flex justify-content-end ps-2 pe-2 pt-2">
        <For each={props.tabs}>
          {(tab, index) => (
            <div class="nav-item">
              <span
                class="nav-link"
                classList={{ active: tabIndex() === index() }}
                onClick={() => {
                  setTabIndex(index());
                  props.onChange?.(index());
                }}
              >
                {tab.text}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

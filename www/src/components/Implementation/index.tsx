import { Code } from '@components';
import { Component, createSignal, JSXElement, mergeProps } from 'solid-js';

export interface ImplementationProps {
  code?: string | Promise<string | undefined>;
  children?: JSXElement;
  language?: string;
}

export const Implementation: Component<ImplementationProps> = (props) => {
  props = mergeProps({ language: 'tsx' }, props);
  const [tabIndex, setTabIndex] = createSignal<number>(0);

  return (
    <>
      <ul class="nav nav-tabs d-flex justify-content-end">
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            classList={{ active: tabIndex() === 0 }}
            onClick={() => setTabIndex(0)}
          >
            Preview
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            classList={{ active: tabIndex() === 1 }}
            onClick={() => setTabIndex(1)}
          >
            Code
          </a>
        </li>
      </ul>
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
        <Code
          codeClass="m-0 border-0"
          classList={{
            'd-none': tabIndex() !== 1,
            'd-block': tabIndex() === 1,
          }}
          language={props.language}
          content={props.code}
        />
      </div>
    </>
  );
};

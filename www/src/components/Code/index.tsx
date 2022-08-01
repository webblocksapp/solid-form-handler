import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  mergeProps,
  onMount,
} from 'solid-js';
import { useCodeHighlightContext } from '@components';
import './index.css';

export interface CodeProps {
  language?: string;
  children?: JSXElement;
  content?: string | Promise<string | undefined>;
  class?: string;
}

export const Code: Component<CodeProps> = (props) => {
  const [code, setCode] = createSignal<string>();
  const { highlighter, loading } = useCodeHighlightContext();
  let codeRef: HTMLDivElement | undefined;
  props = mergeProps({ class: 'my-3' }, props);

  const setInnerHTML = async () => {
    if (codeRef && loading() === false) {
      codeRef.innerHTML =
        highlighter()?.codeToHtml(
          formatCode(code() as string) || (props.children as string) || '',
          {
            lang: props.language || 'tsx',
          }
        ) || '';
    }
  };

  const formatCode = (code: string) => {
    if (code === undefined) return;
    if (code.match('//@ts-nocheck')) {
      code = code.replace('//@ts-nocheck', '');
      return code.substring(code.indexOf('\n') + 1);
    } else {
      return code;
    }
  };

  createEffect(() => loading() !== undefined && setInnerHTML());

  onMount(async () => {
    props.content && setCode(await props.content);
    props.children && setInnerHTML();
  });

  return (
    <div>
      {loading() && (
        <div
          style={{ 'min-height': '120px' }}
          class="my-3 d-flex p-3 flex-column justify-content-center align-items-center border bg-light"
        >
          Loading code snippet...
          <div class="mt-2 spinner-border text-secondary" />
        </div>
      )}
      <div
        class={`code-snippet border ${props.class}`}
        classList={{ 'd-none': loading() }}
        ref={codeRef}
      ></div>
    </div>
  );
};

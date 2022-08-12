import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onMount,
  JSX,
  splitProps,
} from 'solid-js';
import { useCodeHighlightContext } from '@components';
import './index.css';

export interface CodeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  language?: string;
  content?: string;
  codeClass?: string;
}

export const Code: Component<CodeProps> = (props) => {
  const [code, setCode] = createSignal<string>();
  const { highlighter, loading } = useCodeHighlightContext();
  let codeRef: HTMLDivElement | undefined;
  const [local, rest] = splitProps(mergeProps({ codeClass: 'my-3' }, props), [
    'language',
    'content',
    'codeClass',
  ]);

  const setInnerHTML = async () => {
    if (codeRef && loading() === false) {
      codeRef.innerHTML =
        highlighter()?.codeToHtml(
          formatCode(code() as string) || (rest.children as string) || '',
          {
            lang: local.language || 'tsx',
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
    local.content && setCode(local.content);
    rest.children && setInnerHTML();
  });

  return (
    <div {...rest}>
      {loading() && (
        <div
          style={{ 'min-height': '120px' }}
          class="code-loading my-3 d-flex p-3 flex-column justify-content-center align-items-center border bg-light"
        >
          Loading code snippet...
          <div class="mt-2 spinner-border text-secondary" />
        </div>
      )}
      <div
        class={`code-snippet border ${local.codeClass}`}
        classList={{ 'd-none': loading() }}
        ref={codeRef}
      ></div>
    </div>
  );
};

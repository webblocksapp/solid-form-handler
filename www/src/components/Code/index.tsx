import { Component, createEffect, createSignal, JSX, JSXElement, mergeProps, onMount, splitProps } from 'solid-js';
import { useCodeHighlightContext } from '../CodeHighlightProvider';

export interface CodeProps extends JSX.HTMLAttributes<HTMLPreElement> {
  language?: string;
  children?: JSXElement;
  content?: string | Promise<string | undefined>;
}

export const Code: Component<CodeProps> = (props) => {
  const [code, setCode] = createSignal<string>();
  const { highlighter } = useCodeHighlightContext();
  let [local, rest] = splitProps(props, ['children', 'language', 'content']);
  rest = mergeProps({ class: 'border p-2 bg-light my-3' }, rest);
  let codeRef: HTMLElement | undefined;

  const setInnerHTML = async () => {
    if (codeRef && highlighter()) {
      codeRef.innerHTML =
        highlighter()?.codeToHtml(code() || (local.children as string) || '', {
          lang: local.language || 'tsx',
        }) || '';
    }
  };

  createEffect(() => local.content && setInnerHTML());

  onMount(async () => {
    local.content && setCode(await local.content);
    local.children && setInnerHTML();
  });

  return (
    <pre {...rest}>
      <code style={{ 'white-space': 'break-spaces' }} ref={codeRef} />
    </pre>
  );
};

import hljs from 'highlight.js';
import { Component, createEffect, createSignal, JSX, JSXElement, mergeProps, onMount, splitProps } from 'solid-js';

export interface CodeProps extends JSX.HTMLAttributes<HTMLPreElement> {
  language?: string;
  children?: JSXElement;
  content?: string | Promise<string | undefined>;
}

export const Code: Component<CodeProps> = (props) => {
  const [code, setCode] = createSignal<string>();
  let [local, rest] = splitProps(props, ['children', 'language', 'content']);
  rest = mergeProps({ class: 'border p-2 bg-light my-3' }, rest);
  let codeRef: HTMLElement | undefined;

  const setInnerHTML = () => {
    if (codeRef)
      codeRef.innerHTML = hljs.highlight(code() || (local.children as string) || '', {
        language: local.language || 'typescript',
      }).value;
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

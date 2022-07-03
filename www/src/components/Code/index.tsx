import hljs from 'highlight.js';
import { Component, JSXElement, onMount } from 'solid-js';

export interface CodeProps {
  language?: string;
  children?: JSXElement;
}

export const Code: Component<CodeProps> = (props) => {
  let codeRef: HTMLElement | undefined;

  onMount(() => {
    if (codeRef)
      codeRef.innerHTML = hljs.highlight(props.children as string, { language: props.language || 'typescript' }).value;
  });

  return (
    <pre>
      <code ref={codeRef} />
    </pre>
  );
};

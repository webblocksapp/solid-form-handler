import { Accessor, Component, createContext, createSignal, JSXElement, onMount, useContext } from 'solid-js';
import * as shiki from 'shiki';

export const CodeHighlightContext = createContext<{ highlighter: Accessor<shiki.Highlighter | undefined> }>({} as any);
export const useCodeHighlightContext = () => useContext(CodeHighlightContext);

export interface CodeHighlightProviderProps {
  children?: JSXElement;
}

export const CodeHighlightProvider: Component<CodeHighlightProviderProps> = (props) => {
  const [highlighter, setHighlighter] = createSignal<shiki.Highlighter>();

  onMount(async () => {
    shiki.setCDN('/shiki/');
    setHighlighter(
      await shiki.getHighlighter({
        theme: 'nord',
      })
    );
  });

  return <CodeHighlightContext.Provider value={{ highlighter }}>{props.children}</CodeHighlightContext.Provider>;
};

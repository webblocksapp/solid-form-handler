import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSXElement,
  onMount,
  useContext,
} from 'solid-js';
import * as shiki from 'shiki';

export const CodeHighlightContext = createContext<{
  highlighter: Accessor<shiki.Highlighter | undefined>;
  loading: Accessor<boolean>;
}>({} as any);
export const useCodeHighlightContext = () => useContext(CodeHighlightContext);

export interface CodeHighlightProviderProps {
  children?: JSXElement;
}

export const CodeHighlightProvider: Component<CodeHighlightProviderProps> = (
  props
) => {
  const [highlighter, setHighlighter] = createSignal<shiki.Highlighter>();
  const [loading, setLoading] = createSignal<boolean>(true);

  onMount(async () => {
    setLoading(true);
    shiki.setCDN('/shiki/');
    setHighlighter(
      await shiki.getHighlighter({
        theme: 'github-dark-dimmed',
      })
    );
    setLoading(false);
  });

  return (
    <CodeHighlightContext.Provider value={{ highlighter, loading }}>
      {props.children}
    </CodeHighlightContext.Provider>
  );
};

import {
  Component,
  onMount,
  JSX,
  splitProps,
  createSignal,
  Show,
  createEffect,
} from 'solid-js';
import { snippetsStore } from '@utils';
import Highlight from 'solid-highlight';
import 'highlight.js/styles/atom-one-light.css';
import './index.css';

export interface CodeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  language?: string;
  content?: string;
  codeClass?: string;
  mapReplace?: { [matchText: string]: string };
  noBorder?: boolean;
}

export const Code: Component<CodeProps> = (props) => {
  const [code, setCode] = createSignal('');
  const [local, rest] = splitProps(props, [
    'language',
    'content',
    'codeClass',
    'mapReplace',
    'noBorder',
  ]);

  const formatCode = (code: string = '') => {
    local.mapReplace &&
      Object.keys(local.mapReplace).forEach((matchText) => {
        const newValue = local.mapReplace![matchText];
        code = code.replace(new RegExp(`${matchText}`, 'ig'), newValue);
      });

    if (code.match('//@ts-nocheck')) {
      code = code.replace('//@ts-nocheck', '');
      return code.substring(code.indexOf('\n') + 1);
    } else {
      return code;
    }
  };

  onMount(async () => {
    const code = formatCode((rest.children as string) || '');
    code && setCode(code);
  });

  createEffect(() => {
    const code = formatCode((local.content as string) || '');
    code && setCode(code);
  });

  return (
    <div {...rest}>
      <Show
        when={snippetsStore.loading}
        fallback={
          <div
            class={`code-snippet border ${local.codeClass || ''}`}
            classList={{ 'no-border': local.noBorder }}
          >
            <Highlight autoDetect={false} language={local.language || 'tsx'}>
              {code()}
            </Highlight>
          </div>
        }
      >
        <div
          class="code-snippet loading border bg-light d-flex align-items-center justify-content-center"
          classList={{ 'no-border': local.noBorder }}
        >
          Loading...
        </div>
      </Show>
    </div>
  );
};

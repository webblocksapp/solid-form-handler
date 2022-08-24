import { Component, JSXElement } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './index.css';

export interface DocsContentLayoutProps {
  prev?: string;
  next?: string;
  children?: JSXElement;
}

export const DocsContentLayout: Component<DocsContentLayoutProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div class="docs-content">
      <div>{props.children}</div>
      <div class="d-flex justify-content-end mt-3">
        {props.prev && (
          <button
            class="btn bg-primary text-white"
            onClick={() => navigate(props.prev as string, { scroll: false })}
          >
            <i class="bi bi-chevron-left"></i> Back
          </button>
        )}

        {props.next && (
          <button
            class="btn bg-primary text-white ms-3"
            onClick={() => navigate(props.next as string, { scroll: false })}
          >
            Next <i class="bi bi-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

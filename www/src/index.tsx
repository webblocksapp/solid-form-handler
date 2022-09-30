import { render, Suspense } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js';
import { CodeHighlightProvider, SidebarProvider } from '@components';

render(
  () => (
    <Router>
      <CodeHighlightProvider>
        <SidebarProvider>
          <Suspense>
            <App />
          </Suspense>
        </SidebarProvider>
      </CodeHighlightProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);

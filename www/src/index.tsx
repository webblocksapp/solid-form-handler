import { render, Suspense } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js';
import { SidebarProvider } from '@components';
import { loadSnippets } from '@utils';

const main = async () => {
  await loadSnippets();

  render(
    () => (
      <Router>
        <SidebarProvider>
          <Suspense>
            <App />
          </Suspense>
        </SidebarProvider>
      </Router>
    ),
    document.getElementById('root') as HTMLElement
  );
};

main();

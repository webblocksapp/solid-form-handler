import { render, Suspense } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js';
import { SidebarProvider } from '@components';
import { loadSnippets } from '@utils';
import { BASE_URL } from '@constants';

loadSnippets();

render(
  () => (
    <Router source={hashIntegration()} base={BASE_URL}>
      <SidebarProvider>
        <Suspense>
          <App />
        </Suspense>
      </SidebarProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);

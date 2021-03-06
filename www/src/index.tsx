import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js';
import { CodeHighlightProvider } from '@components';

render(
  () => (
    <Router>
      <CodeHighlightProvider>
        <App />
      </CodeHighlightProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);

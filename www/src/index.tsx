import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { App } from './App';
import './index.css';

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Own scroll behaviour ourselves (ScrollToTop) instead of letting the browser restore a
// stale scroll position across client-side route changes.
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const useHashRouter = import.meta.env.VITE_USE_HASH_ROUTER === 'true';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {useHashRouter ? (
      <HashRouter>
        <App />
      </HashRouter>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { routes } from './routes/routes';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';

// create the actual routes
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>
);

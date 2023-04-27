import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { ErrorFallback } from './error/ErrorFallback';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';

// create the actual routes
const router = createBrowserRouter(routes);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;

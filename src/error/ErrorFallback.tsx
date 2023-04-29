import './Error.css';

export function ErrorFallback({ error }: { error: unknown }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre role="status" className="error">
        {(error as Error).message}
      </pre>
    </div>
  );
}

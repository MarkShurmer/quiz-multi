import React, { ComponentType, FC } from 'react';
import './Error.css';

export function Error({ error }: { error: unknown }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="error">{(error as Error).message}</pre>
    </div>
  );
}

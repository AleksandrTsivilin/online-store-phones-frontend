import { FC, ReactNode, memo, useCallback, useMemo, useState } from 'react';
import { ErrorContext, Props as ErrorContextProps } from './ErrorContext';

interface Props {
  children: ReactNode;
}

export const ErrorContextProvider: FC<Props> = memo(({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: ErrorContextProps = useMemo(() => ({
    error,
    setError,
    clearError,
  }), [error, clearError]);

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
});

import { createContext } from 'react';

export interface Props {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<Props>({
  error: null,
  setError: () => {/* empty */},
  clearError: () => {/* empty */},
});

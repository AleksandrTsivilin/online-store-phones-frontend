import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

export const useErrorContext = () => useContext(ErrorContext);

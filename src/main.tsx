import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorContextProvider } from './contexts/ErrorContext/ErrorContextProvider';
import { ProductsContextProvider } from './contexts/ProductsContext/ProductsContextProvider';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <ErrorContextProvider>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </ErrorContextProvider>,
);

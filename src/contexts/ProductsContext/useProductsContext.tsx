import { useContext } from 'react';
import { ProductsContext } from './ProductsContext';

export const useProductsContext = () => useContext(ProductsContext);

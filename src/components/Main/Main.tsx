import { FC, useCallback, useEffect, useState } from 'react';
import { getDiscountProducts, getNewProducts, getProductsCount } from '../../api/product';
import { useErrorContext } from '../../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { Product } from '../../types/Product';
import { Categories } from '../Categories';
import { Promo } from '../Promo';
import { Recommendations } from '../Recommendations';
import './Main.scss';

export const Main: FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [totals, setTotals] = useState<number[]>([]);

  const { setIsLoaded } = useProductsContext();
  const { setError, clearError } = useErrorContext();

  const loadProducts = useCallback(async () => {
    try {
      clearError();
      setIsLoaded(false);

      const [
        newest,
        discount,
        counts,
      ] = await Promise.all([
        getNewProducts(),
        getDiscountProducts(),
        getProductsCount(),
      ]);

      setNewProducts(newest);
      setDiscountProducts(discount);
      setTotals(counts);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setIsLoaded(true);
    }
  }, [setIsLoaded, setError, clearError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="Main">
      <Promo />

      <Recommendations
        title="Brand new models"
        products={newProducts}
      />

      <Categories totals={totals} />

      <Recommendations
        title="Hot prices"
        products={discountProducts}
      />
    </div>
  );
};

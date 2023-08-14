import { FC, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getProducts } from '../api/product';
import { PageLayout } from '../components/PageLayout';
import { useErrorContext } from '../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../contexts/ProductsContext/useProductsContext';

const AccessoriesPage: FC = () => {
  const {
    limit,
    sortBy,
    setProducts,
    setIsLoaded,
    setTotal,
    setLimit,
    setSortBy,
  } = useProductsContext();

  const { setError, clearError } = useErrorContext();

  const { search } = useLocation();

  useEffect(() => {
    document.title = 'Accessories | Nice Gadgets';
  }, []);

  const loadAccessories = useCallback(async () => {
    try {
      clearError();
      setIsLoaded(false);

      const searchParams = new URLSearchParams(search);

      const paramsPage = Number(searchParams.get('page')) || 1;
      const paramsLimit = Number(searchParams.get('limit')) || limit;
      const paramsSortBy = searchParams.get('sortBy') || sortBy;

      setLimit(limit);
      setSortBy(sortBy);

      const tabletsFromServer = await getProducts(
        'accessories',
        paramsPage,
        paramsLimit,
        paramsSortBy as 'newest' | 'highestPrice' | 'lowestPrice',
      );

      setTotal(tabletsFromServer.count);
      setProducts(tabletsFromServer.data);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setIsLoaded(true);
    }
  }, [
    search,
    limit,
    sortBy,
    setProducts,
    setIsLoaded,
    setError,
    clearError,
    setTotal,
    setLimit,
    setSortBy,
  ]);

  useEffect(() => {
    loadAccessories();
  }, [loadAccessories]);

  return (
    <PageLayout title="Accessories" loadData={loadAccessories} />
  );
};

export default AccessoriesPage;

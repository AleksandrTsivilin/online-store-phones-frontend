import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getProductById, getRecommendedProducts } from '../../api/product';
import { useErrorContext } from '../../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { Product, ProductInfo } from '../../types/Product';
import { BackButton } from '../BackButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { ProductAbout } from '../ProductAbout';
import { ProductDetails } from '../ProductDetails';
import { Recommendations } from '../Recommendations';
import './ProductLayout.scss';

export const ProductLayout: FC = () => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const { pathname } = useLocation();

  const { setError, clearError } = useErrorContext();
  const { setIsLoaded } = useProductsContext();

  useEffect(() => {
    document.title = 'Nice Gadgets';

    if (product) {
      document.title = `${product.name} | Nice Gadgets`;
    }
  }, [product]);

  const loadProduct = useCallback(async () => {
    try {
      clearError();
      setIsLoaded(false);

      const [,, id] = pathname.split('/');

      const productFromServer = await getProductById(id);

      setProduct(productFromServer);
      setSelectedColor(productFromServer.color);
      setSelectedCapacity(productFromServer.capacity);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setIsLoaded(true);
    }
  }, [pathname, setIsLoaded, setError, clearError]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const loadRecommendedProducts = useCallback(async () => {
    if (!product) {
      return;
    }

    const productsFromServer = await getRecommendedProducts(
      product.price,
      product.fullPrice,
      product.category,
    );

    setRecommendedProducts(productsFromServer);
  }, [product]);

  useEffect(() => {
    loadRecommendedProducts();
  }, [loadRecommendedProducts]);

  if (!product) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  return (
    <div className="ProductLayout">
      <section className="ProductLayout__breadcrumbs">
        <Breadcrumbs productName={product.name} />
      </section>

      <section className="ProductLayout__go-back">
        <BackButton />
      </section>

      <section className="ProductLayout__details">
        <ProductDetails
          product={product}
          selectedColor={selectedColor}
          selectedCapacity={selectedCapacity}
          setSelectedColor={setSelectedColor}
          setSelectedCapacity={setSelectedCapacity}
        />
      </section>

      <section className="ProductLayout__about">
        <ProductAbout product={product} />
      </section>

      <section className="ProductLayout__recommendations">
        <Recommendations
          title="You may also like"
          products={recommendedProducts}
        />
      </section>
    </div>
  );
};

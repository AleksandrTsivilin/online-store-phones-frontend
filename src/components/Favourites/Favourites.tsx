import { FC } from 'react';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductCatalog } from '../ProductCatalog';
import './Favourites.scss';

export const Favourites: FC = () => {
  const { likedProducts } = useProductsContext();

  const hasLikedProducts = likedProducts.length > 0;

  return (
    <div className="Favourites">
      <section className="Favourites__breadcrumbs">
        <Breadcrumbs />
      </section>

      <h1 className="Favourites__title">
        Favourites
      </h1>

      {hasLikedProducts && (
        <p className="Favourites__items">
          {likedProducts.length} items
        </p>
      )}

      {!hasLikedProducts && (
        <h2 className="Favourites__empty-message">
          No products found
        </h2>
      )}

      <section className="Favourites__catalog">
        <ProductCatalog products={likedProducts} />
      </section>
    </div>
  );
};

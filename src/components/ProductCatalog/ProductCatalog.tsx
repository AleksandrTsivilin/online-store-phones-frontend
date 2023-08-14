import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductCatalog.scss';

interface Props {
  products: Product[];
}

export const ProductCatalog: FC<Props> = ({ products }) => (
  <section className="ProductCatalog">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </section>
);

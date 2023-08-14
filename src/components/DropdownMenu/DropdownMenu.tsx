import React from 'react';
import { Product } from '../../types/Product';
import { DropdownItem } from '../DropdownItem';
import './DropdownMenu.scss';

interface Props {
  products: Product[];
  selectProduct: (productName: string) => void;
}

export const DropdownMenu: React.FC<Props> = ({
  products,
  selectProduct,
}) => (
  <div className="DropdownMenu">
    {products.length > 0
      ? (
        products.map((product) => (
          <DropdownItem
            key={product.id}
            product={product}
            selectProduct={selectProduct}
          />
        ))
      )
      : (
        <span className="DropdownMenu__empty-message">
          No results found
        </span>
      )}
  </div>
);

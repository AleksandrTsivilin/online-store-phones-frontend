import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { getProductByQuery } from '../../api/product';
import { debounce } from '../../helpers/debounce';
import { Product } from '../../types/Product';
import { DropdownMenu } from '../DropdownMenu';
import './Search.scss';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  const searchQueryRef = useRef<HTMLDivElement>(null);

  const loadProducts = useCallback(async () => {
    try {
      const newProducts = await getProductByQuery(appliedQuery);

      setProducts(newProducts);
      setIsSuggestionsVisible(true);
    } catch {
      setProducts([]);
    }
  }, [appliedQuery]);

  useEffect(() => {
    if (!appliedQuery.trim()) {
      return;
    }

    loadProducts();

    return () => {
      setProducts([]);
    };
  }, [appliedQuery, loadProducts]);

  useEffect(() => {
    const handleDropdownClick = (event: MouseEvent) => {
      if (
        isSuggestionsVisible
          && searchQueryRef.current
          && !searchQueryRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener('click', handleDropdownClick);

    return () => {
      document.removeEventListener('click', handleDropdownClick);
    };
  }, [isSuggestionsVisible]);

  const selectProduct = useCallback((productName: string) => {
    setQuery(productName);
    setIsSuggestionsVisible(false);
  }, []);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
    setIsSuggestionsVisible(false);
  };

  const handleQueryKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      loadProducts();
    }

    if (event.key === 'Escape') {
      setIsSuggestionsVisible(false);
    }
  };

  const handleQueryFocus = () => {
    if (!appliedQuery.trim()) {
      return;
    }

    loadProducts();
  };

  const isDropdownVisible = appliedQuery && isSuggestionsVisible;

  return (
    <div ref={searchQueryRef} className="Search">
      <div className="Search__content">
        <label>
          <i className="Search__icon" />

          <input
            className="Search__input"
            type="text"
            name="search"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleQueryKeyDown}
            onFocus={handleQueryFocus}
          />
        </label>

        <div
          className={classNames('Search__dropdown', {
            'Search__dropdown--opened': isDropdownVisible,
          })}
        >
          <DropdownMenu
            products={products}
            selectProduct={selectProduct}
          />
        </div>
      </div>
    </div>
  );
};

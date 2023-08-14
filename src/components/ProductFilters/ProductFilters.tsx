import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { SortByOptions } from '../../helpers/constants/SortByOptions';
import { limitOptions } from '../../helpers/constants/limitOptions';
import { getEnumKeys } from '../../helpers/getEnumKeys';
import { Icon } from '../Icon';
import { SearchLink } from '../SearchLink';
import './ProductFilters.scss';

export const ProductFilters: FC = () => {
  const [isSortByOpened, setIsSortByOpened] = useState(false);
  const [isLimitOpened, setIsLimitOpened] = useState(false);

  const {
    limit: contextLimit,
    sortBy: contextSortBy,
    setLimit,
    setSortBy,
  } = useProductsContext();

  const refSortBy = useRef<HTMLDivElement>(null);
  const refLimit = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();

  const parsedLimit = Number(searchParams.get('limit')) || contextLimit;
  const parsedSortBy = searchParams.get('sortBy') || contextSortBy;

  useEffect(() => {
    setLimit(Number(parsedLimit));
    setSortBy(parsedSortBy);
  });

  const sortByOptions = getEnumKeys(SortByOptions);

  const toggleSortBy = () => {
    setIsSortByOpened((currentStatus) => !currentStatus);
  };

  const toggleLimit = () => {
    setIsLimitOpened((currentStatus) => !currentStatus);
  };

  useEffect(() => {
    const handleDropdownClick = (event: MouseEvent) => {
      if (
        isSortByOpened
          && refSortBy.current
          && !refSortBy.current.contains(event.target as Node)) {
        setIsSortByOpened(false);
      }

      if (
        isLimitOpened
          && refLimit.current
          && !refLimit.current.contains(event.target as Node)) {
        setIsLimitOpened(false);
      }
    };

    document.addEventListener('click', handleDropdownClick, true);

    return () => {
      document.removeEventListener('click', handleDropdownClick, true);
    };
  }, [isLimitOpened, isSortByOpened, setLimit, setSortBy]);

  return (
    <section className="ProductFilters">
      <div ref={refSortBy} className="ProductFilters__sort-by">
        <span className="ProductFilters__label">
          Sort by
        </span>

        <div
          className="ProductFilters__field"
          role="button"
          tabIndex={0}
          onClick={toggleSortBy}
          onKeyDown={toggleSortBy}
        >
          {sortByOptions.find((key) => (
            SortByOptions[key] === contextSortBy
          ))}

          <div className={classNames('ProductFilters__arrow', {
            'ProductFilters__arrow--opened': isSortByOpened,
          })}>
            <Icon size={16} type="arrow-up" />
          </div>
        </div>

        <div className="ProductFilters__option" >
          <ul
            className={classNames('ProductFilters__list', {
              'ProductFilters__list--opened': isSortByOpened,
            })}
          >
            {sortByOptions.map((key) => (
              <li key={key} className="ProductFilters__item">
                <SearchLink
                  className="ProductFilters__link"
                  params={{ sortBy: SortByOptions[key], page: '1' }}
                  onKeyDown={toggleSortBy}
                  onClick={toggleSortBy}
                >
                  {key}
                </SearchLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={refLimit} className="ProductFilters__limit">
        <span className="ProductFilters__label">
          Items on page
        </span>

        <div
          className="ProductFilters__field"
          role="button"
          tabIndex={0}
          onClick={toggleLimit}
          onKeyDown={toggleLimit}
        >
          {contextLimit}

          <div className={classNames('ProductFilters__arrow', {
            'ProductFilters__arrow--opened': isLimitOpened,
          })}>
            <Icon size={16} type="arrow-up" />
          </div>
        </div>

        <div className="ProductFilters__option">
          <ul
            className={classNames('ProductFilters__list', {
              'ProductFilters__list--opened': isLimitOpened,
            })}
          >
            {limitOptions.map((limitOption) => (
              <li key={limitOption} className="ProductFilters__item">
                <SearchLink
                  className="ProductFilters__link"
                  params={{ limit: String(limitOption), page: '1' }}
                  onClick={toggleLimit}
                  onKeyDown={toggleLimit}
                >
                  {limitOption}
                </SearchLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

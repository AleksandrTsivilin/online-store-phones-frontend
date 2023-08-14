import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getNumbers } from '../../helpers/getNumbers';
import { Icon, IconType } from '../Icon';
import { SearchLink } from '../SearchLink';
import './Pagination.scss';

interface Page {
  page: number;
  type: IconType;
}

export const Pagination: FC = () => {
  const [pages, setPages] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { total, limit } = useProductsContext();

  const currentPage = Number(searchParams.get('page')) || 1;
  const lastPage = pages[pages.length - 1];

  if (Number(currentPage) > lastPage) {
    setSearchParams({ page: `${lastPage}` });
  }

  useEffect(() => {
    setPages(getNumbers(total, limit));
  }, [total, limit]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pages.length;

  const previousPage: Page = isFirstPage
    ? { page: currentPage, type: 'arrow-left-disabled' }
    : { page: currentPage - 1, type: 'arrow-left' };

  const nextPage: Page = isLastPage
    ? { page: currentPage, type: 'arrow-right-disabled' }
    : { page: currentPage + 1, type: 'arrow-right' };

  return (
    <section className="Pagination">
      <SearchLink
        className={classNames('Pagination__item', {
          'Pagination__item--disabled': isFirstPage,
        })}
        params={{ page: `${previousPage.page}` }}
      >
        <Icon size={32} type={previousPage.type} />
      </SearchLink>

      <ul className="Pagination__list">
        {pages.map((page) => (
          <li key={page}>
            <SearchLink
              className={classNames('Pagination__item', {
                'Pagination__item--selected': page === currentPage,
              })}
              params={{ page: `${page}` }}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>

      <div className="Pagination__count">
        {`${currentPage} / ${lastPage}`}
      </div>

      <SearchLink
        className={classNames('Pagination__item', {
          'Pagination__item--disabled': isLastPage,
        })}
        params={{ page: `${nextPage.page}` }}
      >
        <Icon size={32} type={nextPage.type} />
      </SearchLink>
    </section>
  );
};

import { FC } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../helpers/SearchHelper';

interface Props extends Omit<LinkProps, 'to'> {
  params: SearchParams;
}

export const SearchLink: FC<Props> = (
  { children, params, ...props },
) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ search: getSearchWith(searchParams, params) }}
      {...props}
    >
      {children}
    </Link>
  );
};

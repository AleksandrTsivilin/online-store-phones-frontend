import classNames from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

interface Props {
  productName?: string;
}

export const Breadcrumbs: FC<Props> = ({ productName }) => {
  const { pathname } = useLocation();

  const [category] = pathname.split('/').filter(Boolean);

  return (
    <div className="Breadcrumbs">
      <Link className="Breadcrumbs__home" to="/" />

      <i className="Breadcrumbs__arrow" />

      <Link
        className={classNames('Breadcrumbs__crumb', {
          'Breadcrumbs__crumb--active': Boolean(productName),
          'Breadcrumbs__crumb--disabled': !productName,
        })}
        to={`/${category}`}
      >
        {category}
      </Link>

      {productName && (
        <>
          <div className="Breadcrumbs__arrow" />

          <div className="Breadcrumbs__crumb">
            {productName}
          </div>
        </>
      )}
    </div>
  );
};

import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../helpers/constants/navigationItems';
import './Navigation.scss';

interface Props {
  toggleMenu?: (status?: boolean) => void;
}

export const Navigation: FC<Props> = ({ toggleMenu }) => (
  <nav className="Navigation">
    <ul className="Navigation__list">
      {navigationItems.map(({ id, path, title }) => (
        <li key={id} className="Navigation__item">
          <NavLink
            className={({ isActive }) => classNames('Navigation__link', {
              'Navigation__link--active': isActive,
            })}
            to={path}
            onClick={() => toggleMenu && toggleMenu(false)}
          >
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

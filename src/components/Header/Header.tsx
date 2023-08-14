import classNames from 'classnames';
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getFontSize } from '../../helpers/getFontSize';
import '../../styles/icon.scss';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import './Header.scss';
import { Search } from '../Search';

export const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { likedProductsCount, cartProductsCount } = useProductsContext();

  const toggleMenu = (status?: boolean) => {
    if (status) {
      setIsMenuOpened(status);

      return;
    }

    setIsMenuOpened((currentState) => !currentState);
  };

  const likedFontSize = getFontSize(likedProductsCount);
  const cartFontSize = getFontSize(cartProductsCount);

  return (
    <>
      <header className="Header">
        <div className="Header__branding">
          <div className="Header__logo">
            <Logo type="header" />
          </div>

          <div className="Header__nav">
            <Navigation />
          </div>
        </div>

        <div className="Header__search">
          <Search />
        </div>

        <div className="Header__menu">
          <button
            className="Header__toggler"
            type="button"
            onClick={() => toggleMenu()}
          >
            <i
              className={classNames('Header__menu-icon', {
                'Header__menu-icon--opened': isMenuOpened,
              })}
            />
          </button>
        </div>

        <div className="Header__icons">
          <div className="icon">
            <NavLink
              className={({ isActive }) => classNames('icon__link', {
                'icon__link--active': isActive,
              })}
              to="favourites"
            >
              <div className="icon__image">
                <Icon type="like" size={18} />

                {likedProductsCount > 0 && (
                  <div className="icon__counter">
                    <span className="icon__counter-text" style={likedFontSize}>
                      {likedProductsCount < 100 ? likedProductsCount : '99+'}
                    </span>
                  </div>
                )}
              </div>
            </NavLink>
          </div>

          <div className="icon">
            <NavLink
              className={({ isActive }) => classNames('icon__link', {
                'icon__link--active': isActive,
              })}
              to="cart"
            >
              <div className="icon__image">
                <Icon type="cart" size={18} />

                {cartProductsCount > 0 && (
                  <div className="icon__counter">
                    <span className="icon__counter-text" style={cartFontSize}>
                      {cartProductsCount < 100 ? cartProductsCount : '99+'}
                    </span>
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </header>

      <BurgerMenu
        isMenuOpened={isMenuOpened}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

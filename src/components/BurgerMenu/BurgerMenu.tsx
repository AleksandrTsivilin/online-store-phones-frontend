import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getFontSize } from '../../helpers/getFontSize';
import '../../styles/icon.scss';
import { Icon } from '../Icon';
import { Navigation } from '../Navigation';
import './BurgerMenu.scss';

interface Props {
  isMenuOpened: boolean;
  toggleMenu: (status?: boolean) => void;
}

export const BurgerMenu: FC<Props> = ({ isMenuOpened, toggleMenu }) => {
  const { likedProductsCount, cartProductsCount } = useProductsContext();

  const likedFontSize = getFontSize(likedProductsCount);
  const cartFontSize = getFontSize(cartProductsCount);

  return (
    <nav
      className={classNames('BurgerMenu', {
        'BurgerMenu--opened': isMenuOpened,
      })}
    >
      <Navigation toggleMenu={toggleMenu} />
      <div className="BurgerMenu__icons">
        <div className="icon">
          <Link
            className="icon__link"
            to="favourites"
            onClick={() => toggleMenu(false)}
          >
            <div className="icon__image icon__image">
              <Icon type="like" size={18} />

              {likedProductsCount > 0 && (
                <div className="icon__counter">
                  <span
                    className="icon__counter-text"
                    style={likedFontSize}
                  >
                    {likedProductsCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className="icon">
          <Link
            className="icon__link"
            to="cart"
            onClick={() => toggleMenu(false)}
          >
            <div className="icon__image">
              <Icon type="cart" size={18} />

              {cartProductsCount > 0 && (
                <div className="icon__counter">
                  <span
                    className="icon__counter-text"
                    style={cartFontSize}
                  >
                    {cartProductsCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

/* eslint-disable indent */
import { FC, ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import cart from '../../assets/icons/Cart.svg';
import close from '../../assets/icons/Close.svg';
import favouritesFilled from '../../assets/icons/Favourites-filled.svg';
import favourites from '../../assets/icons/Favourites.svg';
import menu from '../../assets/icons/Menu.svg';
import minus from '../../assets/icons/Minus.svg';
import plus from '../../assets/icons/Plus.svg';
import search from '../../assets/icons/Search.svg';
import arrowLeft from '../../assets/icons/arrow-left-default.svg';
import arrowRight from '../../assets/icons/arrow-right-default.svg';
import arrowUp from '../../assets/icons/arrow-up-default.svg';
import './Icon.scss';

export type IconType = 'menu' | 'cart'
| 'like' | 'like-filled'
| 'plus' | 'plus-disabled'
| 'minus' | 'minus-disabled'
| 'arrow-up' | 'arrow-up-disabled'
| 'arrow-left' | 'arrow-left-disabled'
| 'arrow-right' | 'arrow-right-disabled'
| 'close' | 'close-disabled'
| 'search' | 'search-disabled';

interface Props {
  children?: ReactNode;
  size: number;
  type: IconType;
}

export const Icon: FC<Props> = ({ children, size, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'close':
      case 'close-disabled':
        return close;

      case 'menu':
        return menu;

      case 'cart':
        return cart;

      case 'like':
        return favourites;

      case 'like-filled':
        return favouritesFilled;

      case 'minus':
      case 'minus-disabled':
        return minus;

      case 'plus':
      case 'plus-disabled':
        return plus;

      case 'search':
      case 'search-disabled':
        return search;

      case 'arrow-left':
      case 'arrow-left-disabled':
        return arrowLeft;

      case 'arrow-right':
      case 'arrow-right-disabled':
        return arrowRight;

      case 'arrow-up':
      case 'arrow-up-disabled':
        return arrowUp;

      default:
        return '';
    }
  };

  return (
    <div
      className={`Icon Icon--${type}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {children}
      <ReactSVG src={getIcon()} />
    </div>
  );
};

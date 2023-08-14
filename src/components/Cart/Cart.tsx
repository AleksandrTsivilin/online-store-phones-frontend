import classNames from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { calculatePrice } from '../../helpers/calculatePrice';
import { calculateQuantity } from '../../helpers/calculateQuantity';
import { BASE_URL } from '../../helpers/fetchClient';
import { BackButton } from '../BackButton';
import { Icon } from '../Icon';
import { Modal } from '../Modal/Modal';
import './../../styles/modal.scss';
import './Cart.scss';

export const Cart: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const {
    cart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
  } = useProductsContext();

  const totalPrice = cart.reduce((total, product) => (
    total + calculatePrice(product)
  ), 0);

  const totalQuantity = calculateQuantity(cart);

  const hasItemsInCart = cart.length > 0;

  const checkout = () => {
    setIsModalOpened(true);
    deleteAllProductsFromCart();
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <section className="Cart">
      <div
        className={classNames('Cart__content', {
          'Cart__content--blur': isModalOpened,
        })}
      >
        <div className="Cart__go-back">
          <BackButton />
        </div>

        <h2 className="Cart__title">Cart</h2>

        {!hasItemsInCart && (
          <h2 className="Cart__empty-message">
            Cart is empty now
          </h2>
        )}

        {hasItemsInCart && (
          <div className="Cart__products">
            <div className="Cart__list">
              {cart.map((product) => {
                const itemPrice = calculatePrice(product);

                const canIncrement = product.quantity < 99;
                const canDecrement = product.quantity > 1;

                const incrementIcon = canIncrement ? 'plus' : 'plus-disabled';
                const decrementIcon = canDecrement ? 'minus' : 'minus-disabled';

                return (
                  <div key={product.id} className="Cart__item">
                    <div className="Cart__row">
                      <button
                        onClick={() => deleteProductFromCart(product.id, true)}
                      >
                        <Icon size={16} type="close-disabled" />
                      </button>

                      <Link to={`/${product.category}/${product.itemId}`}>
                        <img
                          className="Cart__image"
                          src={`${BASE_URL}/${product.image}`}
                          alt={product.name}
                        />
                      </Link>

                      <Link
                        className="Cart__description"
                        to={`/${product.category}/${product.itemId}`}
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="Cart__row">
                      <div className="Cart__quantity-selector">
                        <button
                          className="Cart__modify-button"
                          disabled={!canDecrement}
                          onClick={() => deleteProductFromCart(product.id)}
                        >
                          <Icon size={32} type={decrementIcon} />
                        </button>

                        <span className="Cart__quantity">
                          {product.quantity}
                        </span>

                        <button
                          className="Cart__modify-button"
                          disabled={!canIncrement}
                          onClick={() => addProductToCart(product)}
                        >
                          <Icon size={32} type={incrementIcon} />
                        </button>
                      </div>

                      <p className="Cart__price">
                        {itemPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="Cart__checkout">
              <p className="Cart__total-price">
                {totalPrice}
              </p>

              <p className="Cart__total">
                Total for {totalQuantity} items
              </p>

              <button
                className="Cart__checkout-button"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <CSSTransition
        in={isModalOpened}
        timeout={400}
        classNames="alert"
        unmountOnExit
      >
        <Modal closeModal={closeModal}/>
      </CSSTransition>
    </section>
  );
};

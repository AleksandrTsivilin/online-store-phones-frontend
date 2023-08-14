import { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { BASE_URL } from '../../helpers/fetchClient';
import { findItemById } from '../../helpers/findItemById';
import { Product } from '../../types/Product';
import { Icon } from '../Icon';
import './ProductCard.scss';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = memo(({ product }) => {
  const navigate = useNavigate();

  const {
    cart,
    likedProducts,
    addProductToCart,
    toggleLikeProduct,
  } = useProductsContext();

  const addToCart = () => {
    addProductToCart(product);
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const toggleLike = () => {
    toggleLikeProduct(product);
  };

  const hasItemInCart = Boolean(findItemById(cart, product.id));
  const isLiked = Boolean(findItemById(likedProducts, product.id));

  const likeButtonIcon = isLiked ? 'like-filled' : 'like';

  return (
    <article className="Card">
      <Link
        className="Card__link"
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          className="Card__image"
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
        />
      </Link>

      <Link to={`/${product.category}/${product.itemId}`}>
        <h2 className="Card__title">
          {product.name}
        </h2>
      </Link>

      <section className="Card__prices">
        <span className="Card__current-price">
          {product.price}
        </span>

        <span className="Card__previous-price">
          {product.fullPrice}
        </span>
      </section>

      <hr className="Card__divide-line" />

      <ul className="Card__list-specifications">
        <li className="Card__item-specification">
          <p className="Card__item-title-specification">
            Screen
          </p>

          <span className="Card__item-value-specification">
            {product.screen}
          </span>
        </li>

        <li className="Card__item-specification">
          <p className="Card__item-title-specification">
            Capacity
          </p>

          <span className="Card__item-value-specification">
            {product.capacity}
          </span>
        </li>

        <li className="Card__item-specification">
          <p className="Card__item-title-specification">
            RAM
          </p>

          <span className="Card__item-value-specification">
            {product.ram}
          </span>
        </li>
      </ul>

      <section className="Card__actions">
        {hasItemInCart
          ? (
            <button
              className="Card__actions-button Card__actions-button--added"
              onClick={navigateToCart}
            >
              Added to cart
            </button>
          )
          : (
            <button
              className="Card__actions-button Card__actions-button--add"
              onClick={addToCart}
            >
              Add to cart
            </button>
          )}

        <button
          className="Card__actions-button Card__actions-button--like"
          onClick={toggleLike}
        >
          <Icon size={40} type={likeButtonIcon} />
        </button>
      </section>
    </article>
  );
});

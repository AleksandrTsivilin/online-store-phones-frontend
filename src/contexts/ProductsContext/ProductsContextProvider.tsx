import { FC, ReactNode, memo, useCallback, useMemo, useState } from 'react';
import { calculateQuantity } from '../../helpers/calculateQuantity';
import { findItemById } from '../../helpers/findItemById';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CartProduct, Product } from '../../types/Product';
import { Props as ProductContextProps, ProductsContext } from './ProductsContext';

interface Props {
  children: ReactNode;
}

export const ProductsContextProvider: FC<Props> = memo(({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useLocalStorage('limit', 16);
  const [sortBy, setSortBy] = useState('newest');
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);
  const [likedProducts, setLikedProducts] = useLocalStorage<Product[]>(
    'liked',
    [],
  );

  const addProductToCart = useCallback((product: Product) => {
    setCart((currentCart: CartProduct[]) => {
      const foundProduct = findItemById(currentCart, product.id);

      if (foundProduct) {
        return currentCart.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, [setCart]);

  const deleteProductFromCart = useCallback((
    productId: number,
    fully: boolean = false,
  ) => {
    setCart((currentCart: CartProduct[]) => {
      return currentCart.map((item) => {
        if (item.id === productId) {
          return fully || item.quantity === 1
            ? null
            : { ...item, quantity: item.quantity - 1 };
        }

        return item;
      }).filter(Boolean);
    });
  }, [setCart]);

  const deleteAllProductsFromCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const toggleLikeProduct = useCallback((product: Product) => {
    setLikedProducts((currentProducts: Product[]) => {
      const foundProduct = findItemById(currentProducts, product.id);

      if (foundProduct) {
        return currentProducts.filter(likedProduct => (
          likedProduct.id !== product.id
        ));
      }

      return [...currentProducts, product];
    });
  }, [setLikedProducts]);

  const value: ProductContextProps = useMemo(() => ({
    total,
    limit,
    sortBy,
    cart,
    likedProducts,
    products,
    isLoaded,
    cartProductsCount: calculateQuantity(cart),
    likedProductsCount: likedProducts.length,
    setTotal,
    setLimit,
    setSortBy,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    toggleLikeProduct,
    setProducts,
    setIsLoaded,
  }), [
    total,
    limit,
    sortBy,
    cart,
    likedProducts,
    products,
    isLoaded,
    setTotal,
    setLimit,
    setSortBy,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    toggleLikeProduct,
  ]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
});

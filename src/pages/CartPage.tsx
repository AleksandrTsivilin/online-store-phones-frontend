import { FC, useEffect } from 'react';
import { Cart } from '../components/Cart';

const CartPage: FC = () => {
  useEffect(() => {
    document.title = 'Cart | Nice Gadgets';
  }, []);

  return (
    <Cart />
  );
};

export default CartPage;

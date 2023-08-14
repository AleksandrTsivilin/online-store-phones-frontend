import { CartProduct } from '../types/Product';

export function calculatePrice(product: CartProduct): number {
  return product.price * product.quantity;
}

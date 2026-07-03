import { cartReducer } from './CartContext';
import { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Backpack',
  price: 109.95,
  category: "men's clothing",
  description: 'A test product',
  image: 'https://test.com/image.jpg',
  rating: { rate: 4.5, count: 120 }
};

describe('cartReducer', () => {
  it('adds a new item to empty cart', () => {
    const result = cartReducer([], { type: 'ADD_ITEM', payload: mockProduct });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(1);
    expect(result[0].title).toBe('Test Backpack');
  });

  it('increases quantity when adding existing item', () => {
    const existingCart = [{ ...mockProduct, quantity: 1 }];
    const result = cartReducer(existingCart, { type: 'ADD_ITEM', payload: mockProduct });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it('removes an item from cart', () => {
    const existingCart = [{ ...mockProduct, quantity: 1 }];
    const result = cartReducer(existingCart, { type: 'REMOVE_ITEM', payload: { id: 1 } });
    expect(result).toHaveLength(0);
  });

  it('updates quantity of an item', () => {
    const existingCart = [{ ...mockProduct, quantity: 1 }];
    const result = cartReducer(existingCart, { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 5 } });
    expect(result[0].quantity).toBe(5);
  });

  it('clears the cart', () => {
    const existingCart = [{ ...mockProduct, quantity: 3 }];
    const result = cartReducer(existingCart, { type: 'CLEAR_CART' });
    expect(result).toHaveLength(0);
  });
});
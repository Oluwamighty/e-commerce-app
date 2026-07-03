import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';
import CartItemContext from '../context/CartContext';
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

const mockDispatch = jest.fn();

function renderWithContext() {
  return render(
    <CartItemContext.Provider value={{ cart: [], dispatch: mockDispatch }}>
      <ProductCard product={mockProduct} />
    </CartItemContext.Provider>
  );
}

describe('ProductCard', () => {
  beforeEach(() => {
    mockDispatch.mockClear(); // reset between tests
  });

  it('renders product title', () => {
    renderWithContext();
    expect(screen.getByText('Test Backpack')).toBeInTheDocument();
  });

  it('renders product price', () => {
    renderWithContext();
    expect(screen.getByText('$109.95')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    renderWithContext();
    expect(screen.getByAltText('Test Backpack')).toBeInTheDocument();
  });

  it('dispatches ADD_ITEM when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext();

    await user.click(screen.getByText('Add to Cart'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: mockProduct
    });
  });

  it('dispatches ADD_ITEM only once per click', async () => {
    const user = userEvent.setup();
    renderWithContext();

    await user.click(screen.getByText('Add to Cart'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
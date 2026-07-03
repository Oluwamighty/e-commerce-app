'use client'
import { useContext } from "react";
import CartItemContext from "../context/CartContext";
import { Product } from "../types";
import Link from "next/link";
import Button from "../components/Button";

export default function ProductCard({ product }: { product: Product }) {
  const context = useContext(CartItemContext);
  if (!context) return null;
  const { dispatch } = context;

  function handleAddToCart() {
    dispatch({ type: "ADD_ITEM", payload: product });
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto mb-4" />
        <h3 className="text-white text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>
      </Link>
      <p className="text-green-400 font-bold mb-4">${product.price}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  )
}
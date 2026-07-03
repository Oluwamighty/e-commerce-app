'use client'
import { useContext } from "react";
import CartItemContext from "../context/CartContext";
import Link from "next/link";

export default function CartBadge() {
  const context = useContext(CartItemContext);
  if (!context) return null;
  const { cart } = context;

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="relative text-white">
      🛒
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-green-600 text-xs rounded-full px-2 py-0.5">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
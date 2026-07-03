'use client';
import { useContext } from "react";
import CartItemContext from "../context/CartContext";
import { Product } from "../types";
import Button from "./Button";

export default function AddToCartButton({ product }: { product: Product }) {
    const context = useContext(CartItemContext);
    if (!context) return null;
    const { dispatch } = context;

    return (
        <Button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
            Add to Cart
        </Button>
    );
}
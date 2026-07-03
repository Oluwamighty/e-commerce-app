'use client'

import { useMemo } from "react";
import { useContext } from "react"
import CartItemContext from "../context/CartContext"
import Button from "../components/Button";
import Link from "next/link";

export default function CartPage(){
    const context = useContext(CartItemContext);
    if(!context) return null;
    const {cart, dispatch} = context;

    const totalPrice = useMemo(()=>{
        return cart.reduce((total, item)=> total + (item.price * item.quantity), 0);
    }, [cart]);
    
    if(cart.length === 0){
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
                <p className="text-5xl mb-4">🛒</p>
                <h2 className="text-white text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
                <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8 md:px-8">
            <h1 className="text-2xl font-bold text-white mb-6">Your Cart ({cart.length} items)</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Cart Items */}
                <div className="flex-1 flex flex-col gap-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                            
                            {/* Mobile: stacked, Desktop: row */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-24 w-24 object-contain mx-auto sm:mx-0 flex-shrink-0"
                                />

                                {/* Details */}
                                <div className="flex-1 flex flex-col gap-2">
                                    <p className="text-white font-medium text-sm line-clamp-2">{item.title}</p>
                                    <p className="text-green-400 font-bold">${item.price.toFixed(2)}</p>

                                    {/* Quantity + Remove row */}
                                    <div className="flex flex-wrap items-center gap-3 mt-auto">
                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    if (item.quantity === 1) {
                                                        dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
                                                    } else {
                                                        dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } });
                                                    }
                                                }}
                                                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="text-white w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })}
                                                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
                                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                        >
                                            Remove
                                        </button>

                                        <p className="text-gray-400 text-sm ml-auto">
                                            Subtotal: <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary — stacks below on mobile, sidebar on desktop */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20">
                        <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
                        
                        <div className="flex justify-between text-gray-400 text-sm mb-2">
                            <span>Items ({cart.reduce((t, i) => t + i.quantity, 0)})</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-sm mb-4">
                            <span>Shipping</span>
                            <span className="text-green-400">Free</span>
                        </div>
                        <div className="border-t border-gray-700 pt-4 flex justify-between text-white font-bold text-lg mb-6">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg transition-colors font-medium mb-3"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={() => dispatch({ type: "CLEAR_CART" })}
                            className="w-full border border-gray-600 hover:border-red-500 text-gray-400 hover:text-red-400 py-2 rounded-lg transition-colors text-sm"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
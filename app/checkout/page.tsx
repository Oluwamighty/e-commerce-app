'use client';
import { useState, useContext, useMemo } from "react";
import CartItemContext from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const context = useContext(CartItemContext);
    const router = useRouter();
    if (!context) return null;
    const { cart, dispatch } = context;

    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        paymentCardNumber: '',
        paymentExpiry: '',
        paymentCVC: ''
    });

    const [formErrors, setFormErrors] = useState({
        fullnameError: '',
        emailError: '',
        addressError: '',
        cityError: '',
        stateError: '',
        zipError: '',
        paymentCardNumberError: '',
        paymentExpiryError: '',
        paymentCVCError: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let isValid = true;
        const errors = { ...formErrors };

        errors.fullnameError = !formData.fullname.trim() ? 'Full name is required' : '';
        isValid = !formData.fullname.trim() ? false : isValid;
        errors.emailError = !formData.email.trim() ? 'Email is required' : '';
        isValid = !formData.email.trim() ? false : isValid;
        errors.addressError = !formData.address.trim() ? 'Address is required' : '';
        isValid = !formData.address.trim() ? false : isValid;
        errors.cityError = !formData.city.trim() ? 'City is required' : '';
        isValid = !formData.city.trim() ? false : isValid;
        errors.stateError = !formData.state.trim() ? 'State is required' : '';
        isValid = !formData.state.trim() ? false : isValid;
        errors.zipError = !formData.zip.trim() ? 'ZIP code is required' : '';
        isValid = !formData.zip.trim() ? false : isValid;
        errors.paymentCardNumberError = !formData.paymentCardNumber.trim() ? 'Card number is required' : '';
        isValid = !formData.paymentCardNumber.trim() ? false : isValid;
        errors.paymentExpiryError = !formData.paymentExpiry.trim() ? 'Expiry date is required' : '';
        isValid = !formData.paymentExpiry.trim() ? false : isValid;
        errors.paymentCVCError = !formData.paymentCVC.trim() ? 'CVC is required' : '';
        isValid = !formData.paymentCVC.trim() ? false : isValid;

        setFormErrors(errors);

        if (isValid) {
            alert('Order placed successfully! 🎉');
            dispatch({ type: "CLEAR_CART" });
            router.push('/products');
        }
    }

    // reusable input field class
    const inputClass = "w-full mt-1 px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors";
    const labelClass = "block text-sm font-medium text-gray-300 mb-1";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8 md:px-8">
            <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

                {/* ── LEFT: FORM ── */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Shipping Information */}
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                            <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-gray-700">
                                🚚 Shipping Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="fullname" className={labelClass}>Full Name</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                    {formErrors.fullnameError && <p className={errorClass}>{formErrors.fullnameError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className={inputClass}
                                    />
                                    {formErrors.emailError && <p className={errorClass}>{formErrors.emailError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="address" className={labelClass}>Street Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="16 Josiah Aina Street"
                                        className={inputClass}
                                    />
                                    {formErrors.addressError && <p className={errorClass}>{formErrors.addressError}</p>}
                                </div>

                                {/* City + State row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className={labelClass}>City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Lagos"
                                            className={inputClass}
                                        />
                                        {formErrors.cityError && <p className={errorClass}>{formErrors.cityError}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className={labelClass}>State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="Lagos State"
                                            className={inputClass}
                                        />
                                        {formErrors.stateError && <p className={errorClass}>{formErrors.stateError}</p>}
                                    </div>
                                </div>

                                <div className="sm:w-1/2">
                                    <label htmlFor="zip" className={labelClass}>ZIP Code</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        placeholder="100001"
                                        className={inputClass}
                                    />
                                    {formErrors.zipError && <p className={errorClass}>{formErrors.zipError}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                            <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-gray-700">
                                💳 Payment Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="paymentCardNumber" className={labelClass}>Card Number</label>
                                    <input
                                        type="text"
                                        id="paymentCardNumber"
                                        name="paymentCardNumber"
                                        value={formData.paymentCardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        className={inputClass}
                                    />
                                    {formErrors.paymentCardNumberError && <p className={errorClass}>{formErrors.paymentCardNumberError}</p>}
                                </div>

                                {/* Expiry + CVC row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="paymentExpiry" className={labelClass}>Expiry Date</label>
                                        <input
                                            type="text"
                                            id="paymentExpiry"
                                            name="paymentExpiry"
                                            value={formData.paymentExpiry}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className={inputClass}
                                        />
                                        {formErrors.paymentExpiryError && <p className={errorClass}>{formErrors.paymentExpiryError}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="paymentCVC" className={labelClass}>CVC</label>
                                        <input
                                            type="text"
                                            id="paymentCVC"
                                            name="paymentCVC"
                                            value={formData.paymentCVC}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength={3}
                                            className={inputClass}
                                        />
                                        {formErrors.paymentCVCError && <p className={errorClass}>{formErrors.paymentCVCError}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors"
                        >
                            Place Order — ${totalPrice.toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* ── RIGHT: ORDER SUMMARY ── */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20">
                        <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-gray-700">
                            Order Summary
                        </h2>
                        <div className="space-y-3 mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 items-center">
                                    <img src={item.thumbnail} alt={item.title} className="w-10 h-10 object-contain flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-300 text-xs line-clamp-1">{item.title}</p>
                                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-white text-sm font-medium flex-shrink-0">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Shipping</span>
                                <span className="text-green-400">Free</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
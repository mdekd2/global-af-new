'use client';

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

interface FormErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  name?: string;
}

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<'summary' | 'payment' | 'confirmation'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => router.push('/products')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentForm.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
    }

    // Name validation
    if (paymentForm.name.trim().length < 3) {
      newErrors.name = 'Please enter a valid name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      setStep('confirmation');
    } catch (error) {
      console.error('Payment processing failed:', error);
      // Handle error state here
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const renderOrderSummary = () => (
    <div className="border p-6 rounded-lg shadow-md mb-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>{item.name} ({item.quantity} x ${item.price.toFixed(2)})</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <button
        onClick={() => setStep('payment')}
        className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-200"
      >
        Proceed to Payment
      </button>
    </div>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="border p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={paymentForm.cardNumber}
            onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: formatCardNumber(e.target.value) })}
            placeholder="1234 5678 9012 3456"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={19}
            required
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={paymentForm.expiryDate}
              onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: formatExpiryDate(e.target.value) })}
              placeholder="MM/YY"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={5}
              required
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={paymentForm.cvv}
              onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
              placeholder="123"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={4}
              required
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            type="text"
            id="name"
            value={paymentForm.name}
            onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
            placeholder="John Doe"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setStep('summary')}
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
          disabled={isProcessing}
        >
          Back to Summary
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="text-center animate-fade-in">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-green-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <button
        onClick={() => router.push('/products')}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-200"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="transition-opacity duration-300">
        {step === 'summary' && renderOrderSummary()}
        {step === 'payment' && renderPaymentForm()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
};

export default CheckoutPage;
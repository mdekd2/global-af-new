'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

const CartDisplay = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Start shopping to add items to your cart.</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md flex flex-col">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                {item.imageUrl && (
                  <div className="relative w-full h-48 mb-4">
                    <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" className="rounded" />
                  </div>
                )}
                <div className="flex items-center space-x-2 mb-4">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-20 p-2 border rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-8 text-right">
          <p className="text-xl font-semibold">Total: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CartDisplay; 
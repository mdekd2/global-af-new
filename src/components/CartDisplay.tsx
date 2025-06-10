'use client';

import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartDisplay = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Start shopping to add items to your cart.</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div key={item.product.id} className="border p-4 rounded-lg shadow-md flex flex-col">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
              <p className="text-gray-600 mb-2">${item.product.price.toFixed(2)}</p>
              {item.product.imageUrl && (
                <div className="relative w-full h-48 mb-4">
                  <Image src={item.product.imageUrl} alt={item.product.name} layout="fill" objectFit="cover" className="rounded" />
                </div>
              )}
              <div className="flex items-center space-x-2 mb-4">
                <label htmlFor={`quantity-${item.product.id}`} className="sr-only">Quantity</label>
                <input
                  id={`quantity-${item.product.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                  className="w-20 p-2 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="mt-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 border-t-2 border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total: ${calculateTotalPrice().toFixed(2)}</h2>
        <button
          onClick={() => router.push('/checkout')}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Proceed to Checkout (Mock)
        </button>
      </div>
    </div>
  );
};

export default CartDisplay; 
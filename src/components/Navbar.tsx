'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Global AF</span>
            </Link>
            <div className="ml-6 flex gap-8">
              <Link 
                href="/products" 
                className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Link href="/cart" className="text-gray-900 hover:text-gray-500 relative mr-4">
              Cart ({totalItems})
            </Link>
            <Link href="/auth" className="text-gray-900 hover:text-gray-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
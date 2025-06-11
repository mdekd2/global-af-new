'use client';

import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/firestore';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Product ID is missing.');
      return;
    }

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full h-96 mb-6">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button
            onClick={() => addToCart(product, 1)}
            className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
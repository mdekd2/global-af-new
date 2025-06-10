import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-48">
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="object-center"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>
          <p className="mt-2 text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 
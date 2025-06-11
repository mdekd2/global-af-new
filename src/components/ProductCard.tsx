import Link from 'next/link';
import Image from 'next/image';
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
    <div className="border rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800">
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
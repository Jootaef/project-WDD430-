'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore, useWishlistStore } from '@/lib/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onWishlist?: () => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlist,
  isWishlisted = false,
}) => {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted: checkWishlisted } = useWishlistStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    const isInWishlist = checkWishlisted(product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <Card className="group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isHandmade && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Handmade
            </span>
          )}
          {product.isEcoFriendly && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Eco-Friendly
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
        >
          <Heart 
            className={`w-4 h-4 ${checkWishlisted(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </button>

        {/* Artisan Info */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <img
              src={product.artisan.avatar}
              alt={product.artisan.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600">{product.artisan.name}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 
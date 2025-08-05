'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

const WishlistPage: React.FC = () => {
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (product: any) => {
    addItem(product);
    removeItem(product.id);
    toast.success(`${product.name} moved to cart!`);
  };

  const handleRemoveFromWishlist = (product: any) => {
    removeItem(product.id);
    toast.success(`${product.name} removed from wishlist`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-gray-400 mb-6">
              <Heart className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding your favorite treats to your wishlist to save them for later!
            </p>
            <Link href="/products">
              <Button size="lg">
                Browse Products
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="sweet-title mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isVegan && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Vegan
                      </span>
                    )}
                    {product.isGlutenFree && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Gluten-Free
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Baker Info */}
                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={product.baker.avatar}
                        alt={product.baker.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-600">{product.baker.name}</span>
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

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Move to Cart
                    </Button>
                    <Link href={`/products/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Wishlist Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {wishlistItems.length}
              </div>
              <p className="text-gray-600">Items Saved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </div>
              <p className="text-gray-600">Total Value</p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => {
                  wishlistItems.forEach(product => addItem(product));
                  clearWishlist();
                  toast.success('All items moved to cart!');
                }}
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move All to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage; 
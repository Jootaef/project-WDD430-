'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, Share2, ArrowLeft, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { products, categories } from '@/lib/data';
import { ProductCategory } from '@/lib/types';

// Mock wishlist data - in a real app this would come from a store/context
const mockWishlistItems = [
  {
    id: '1',
    product: products[0],
    addedDate: '2024-01-15',
    notes: 'Perfect for mom\'s birthday'
  },
  {
    id: '2',
    product: products[1],
    addedDate: '2024-01-10',
    notes: 'Beautiful home decor piece'
  },
  {
    id: '3',
    product: products[2],
    addedDate: '2024-01-08',
    notes: 'Gift for sister'
  }
];

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'price'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case 'name':
        return a.product.name.localeCompare(b.product.name);
      case 'price':
        return a.product.price - b.product.price;
      default:
        return 0;
    }
  });

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (item: typeof mockWishlistItems[0]) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', item.product);
  };

  const shareWishlist = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Handcrafted Haven Wishlist',
        text: 'Check out these amazing handcrafted items I love!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-12"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Start building your collection of handcrafted treasures by adding items you love to your wishlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Explore Products
                </Button>
              </Link>
              <Link href="/artisans">
                <Button variant="outline" size="lg">
                  Meet Our Artisans
                </Button>
              </Link>
            </div>
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
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={shareWishlist}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Wishlist
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} • 
                Total value: ${wishlistItems.reduce((sum, item) => sum + item.product.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="date">Date Added</option>
              <option value="name">Name A-Z</option>
              <option value="price">Price Low to High</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {wishlistItems.length} items
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Filters applied</span>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={viewMode === 'list' ? 'bg-white rounded-lg shadow-md p-4' : ''}
              >
                {viewMode === 'list' ? (
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <span className="text-xl font-bold text-primary">${item.product.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{item.product.description}</p>
                      <p className="text-gray-500 text-sm mb-2">Added: {new Date(item.addedDate).toLocaleDateString()}</p>
                      {item.notes && (
                        <p className="text-gray-600 text-sm mb-2 italic">"{item.notes}"</p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => addToCart(item)}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/products/${item.product.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                          {item.product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {item.product.artisan.name}</p>
                      <p className="text-sm text-gray-500 mb-2">Added: {new Date(item.addedDate).toLocaleDateString()}</p>
                      {item.notes && (
                        <p className="text-sm text-gray-600 mb-3 italic">"{item.notes}"</p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-primary">${item.product.price}</span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                          <span className="text-sm text-gray-500">{item.product.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => addToCart(item)}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/products/${item.product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Bulk Actions */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Wishlist
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share All
              </Button>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent-orange text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Discover More Treasures</h2>
            <p className="text-lg mb-6 opacity-90">
              Keep exploring our collection of handcrafted items and add more to your wishlist!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Browse Products
                </Button>
              </Link>
              <Link href="/artisans">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Meet Artisans
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage; 
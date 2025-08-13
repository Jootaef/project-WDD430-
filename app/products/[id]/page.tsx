'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Heart, Truck, Shield, Clock, MapPin, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { products, reviews } from '@/lib/data';
import { Product, Review } from '@/lib/types';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const productId = params.id as string;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'artisan'>('description');

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(r => r.productId === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-600">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = product.price + selectedCustomizations.reduce((sum, customId) => {
    const customization = product.customizations?.find(c => c.id === customId);
    return sum + (customization?.price || 0);
  }, 0);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', {
      product,
      quantity,
      customizations: selectedCustomizations,
      totalPrice
    });
  };

  const toggleCustomization = (customId: string) => {
    setSelectedCustomizations(prev => 
      prev.includes(customId)
        ? prev.filter(id => id !== customId)
        : [...prev, customId]
    );
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedImage(0)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === 0 ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
              {/* Add more thumbnail images here if available */}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">${totalPrice}</span>
              {selectedCustomizations.length > 0 && (
                <span className="text-sm text-gray-500">
                  (Base: ${product.price})
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Made in {product.artisan.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Handcrafted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Eco-friendly</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Free shipping</span>
              </div>
            </div>

            {/* Customizations */}
            {product.customizations && product.customizations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Customizations</h3>
                <div className="space-y-2">
                  {product.customizations.map(custom => (
                    <label key={custom.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCustomizations.includes(custom.id)}
                        onChange={() => toggleCustomization(custom.id)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{custom.name}</span>
                      <span className="text-sm font-medium text-primary">+${custom.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
              >
                Add to Cart - ${(totalPrice * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Artisan Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={product.artisan.avatar}
                  alt={product.artisan.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{product.artisan.name}</h4>
                  <p className="text-sm text-gray-600">{product.artisan.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.artisan.bio}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⭐ {product.artisan.rating} ({product.artisan.reviewCount} reviews)</span>
                <span>🎨 {product.artisan.experience} years experience</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${productReviews.length})` },
                { id: 'artisan', label: 'Artisan Profile' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Materials</h4>
                    <ul className="space-y-1">
                      {product.materials.map((material, index) => (
                        <li key={index} className="text-gray-600">• {material}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dimensions</h4>
                    <p className="text-gray-600">{product.dimensions}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
                
                {productReviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-6">
                    {productReviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'artisan' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src={product.artisan.avatar}
                    alt={product.artisan.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{product.artisan.name}</h3>
                    <p className="text-gray-600">{product.artisan.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>⭐ {product.artisan.rating} rating</span>
                      <span>🎨 {product.artisan.experience} years experience</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">About the Artisan</h4>
                  <p className="text-gray-600 leading-relaxed">{product.artisan.bio}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.artisan.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage; 
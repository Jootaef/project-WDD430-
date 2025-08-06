'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Clock, Award, Users } from 'lucide-react';
import { products, reviews } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const { addItem } = useCartStore();
  
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button>Go Back</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const productReviews = reviews.filter(review => review.productId === product.id);
  const totalCustomizationPrice = selectedCustomizations.reduce((total, customId) => {
    const customization = product.customizations?.find(c => c.id === customId);
    return total + (customization?.price || 0);
  }, 0);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedCustomizations);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCustomizationToggle = (customizationId: string) => {
    setSelectedCustomizations(prev => 
      prev.includes(customizationId)
        ? prev.filter(id => id !== customizationId)
        : [...prev, customizationId]
    );
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isVegan && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Vegan
                  </span>
                )}
                {product.isGlutenFree && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Gluten-Free
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Artisan Info */}
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src={product.artisan.avatar}
                  alt={product.artisan.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{product.artisan.name}</p>
                  <p className="text-sm text-gray-600">{product.artisan.experience} years experience</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price + totalCustomizationPrice}
                </span>
                {totalCustomizationPrice > 0 && (
                  <span className="text-sm text-gray-500">
                    +${totalCustomizationPrice} customizations
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 p-0"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Customizations */}
              {product.customizations && product.customizations.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Customizations</h3>
                  <div className="space-y-2">
                    {product.customizations.map((customization) => (
                      <label
                        key={customization.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCustomizations.includes(customization.id)}
                          onChange={() => handleCustomizationToggle(customization.id)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium">{customization.name}</span>
                          <p className="text-sm text-gray-600">{customization.description}</p>
                        </div>
                        <span className="font-semibold text-primary">+${customization.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full mb-4"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price + totalCustomizationPrice) * quantity}
              </Button>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Ready in 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Allergens */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Allergens</h3>
              <div className="space-y-2">
                {product.allergens.length > 0 ? (
                  product.allergens.map((allergen, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">{allergen}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No allergens detected</p>
                )}
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>
            <div className="space-y-4">
              {productReviews.map((review, index) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage; 
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { products } from '@/lib/data';

// Mock cart data - in a real app this would come from a store/context
const mockCartItems = [
  {
    id: '1',
    product: products[0],
    quantity: 2,
    customizations: ['custom-1']
  },
  {
    id: '2',
    product: products[1],
    quantity: 1,
    customizations: []
  }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getItemPrice = (item: typeof mockCartItems[0]) => {
    const basePrice = item.product.price;
    const customizationPrice = item.product.customizations
      ?.filter(custom => item.customizations.includes(custom.id))
      .reduce((sum, custom) => sum + custom.price, 0) || 0;
    
    return (basePrice + customizationPrice) * item.quantity;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Proceeding to checkout with:', { cartItems, total });
    setIsCheckingOut(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-12"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any handcrafted treasures to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Continue Shopping
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
          <div className="flex items-center gap-4 mb-4">
            <Link href="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              by {item.product.artisan.name}
                            </p>
                            {item.customizations.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {item.customizations.map(customId => {
                                  const customization = item.product.customizations?.find(c => c.id === customId);
                                  return customization ? (
                                    <span
                                      key={customId}
                                      className="px-2 py-1 bg-primary text-white text-xs rounded-full"
                                    >
                                      {customization.name}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-gray-600 hover:text-gray-800"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-600 hover:text-gray-800"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ${getItemPrice(item).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-500">
                                ${(getItemPrice(item) / item.quantity).toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">Free Shipping</span>
                </div>
                <p className="text-sm text-gray-600">
                  Orders over $100 ship free. Standard delivery: 3-5 business days.
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">Secure Checkout</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your payment information is encrypted and secure.
                </p>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full"
                size="lg"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>

              {/* Additional Actions */}
              <div className="mt-4 text-center">
                <Link href="/wishlist" className="text-sm text-primary hover:underline">
                  Save items for later
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {product.artisan.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage; 
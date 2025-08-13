'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Award, Clock, Users, Filter } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { artisans, products, categories } from '@/lib/data';
import { ProductCategory } from '@/lib/types';

const ArtisansPage: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'experience'>('rating');

  const filteredArtisans = artisans.filter(artisan => {
    if (selectedSpecialty === 'all') return true;
    return artisan.specialties.includes(selectedSpecialty);
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const getArtisanProducts = (artisanId: string) => {
    return products.filter(product => product.artisan.id === artisanId);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Talented Artisans</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the passionate creators behind our handcrafted treasures. Each artisan brings unique skills, 
            cultural heritage, and artistic vision to create exceptional pieces that tell stories.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{artisans.length}</div>
            <div className="text-sm text-gray-600">Talented Artisans</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by specialty:</span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value as ProductCategory | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Specialties</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredArtisans.map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Artisan Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{artisan.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{artisan.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{artisan.rating}</span>
                        <span className="text-gray-500">({artisan.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{artisan.experience} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artisan Bio */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{artisan.bio}</p>
                
                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {artisan.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Products Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Featured Products:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {getArtisanProducts(artisan.id).slice(0, 2).map(product => (
                      <div key={product.id} className="relative group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            ${product.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/artisans/${artisan.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/products?artisan=${artisan.id}`} className="flex-1">
                    <Button className="w-full">
                      View Products
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent-orange text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Become an Artisan</h2>
            <p className="text-lg mb-6 opacity-90">
              Are you a talented artisan looking to showcase your work? Join our community and start selling your handcrafted creations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtisansPage; 
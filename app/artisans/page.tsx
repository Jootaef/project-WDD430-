'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Award, Clock, MapPin, Mail, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { artisans, products, categories } from '@/lib/data';

const ArtisansPage: React.FC = () => {
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);

  const getArtisanProducts = (artisanId: string) => {
    return products.filter(product => product.artisan.id === artisanId);
  };

  const getSpecialtyLabels = (specialties: string[]) => {
    return specialties.map(specialty => 
      categories.find(cat => cat.value === specialty)?.label || specialty
    );
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Talented Artisans</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover the passionate creators behind our unique handcrafted items. Each artisan 
            brings their own story, skills, and creativity to create one-of-a-kind pieces 
            that you'll treasure forever.
          </p>
        </motion.div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {artisans.map((artisan, index) => (
                          <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="relative mb-6">
                    <Image
                      src={artisan.avatar}
                      alt={artisan.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto border-4 border-primary"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {artisan.experience}+ years
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{artisan.name}</h3>
                
                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(baker.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({baker.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {baker.bio}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {getSpecialtyLabels(baker.specialties).map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-accent-lavender text-white px-3 py-1 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedBaker(selectedBaker === baker.id ? null : baker.id)}
                  className="w-full"
                >
                  View Products
                </Button>
              </Card>

              {/* Baker's Products */}
              {selectedBaker === baker.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <Card className="p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      {baker.name}'s Products
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getBakerProducts(baker.id).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{product.name}</h5>
                            <p className="text-primary font-bold">${product.price}</p>
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 mb-16"
        >
          <h2 className="section-title mb-8">Our Baking Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {bakers.length}
              </div>
              <p className="text-gray-600">Expert Bakers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {products.length}+
              </div>
              <p className="text-gray-600">Unique Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {bakers.reduce((sum, baker) => sum + baker.experience, 0)}+
              </div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {bakers.reduce((sum, baker) => sum + baker.reviewCount, 0)}+
              </div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </motion.div>

        {/* Join Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-accent-orange text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Baking Team</h2>
          <p className="text-xl mb-6 opacity-90">
            Are you a passionate baker looking to create amazing treats? 
            We're always looking for talented individuals to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Mail className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default BakersPage; 
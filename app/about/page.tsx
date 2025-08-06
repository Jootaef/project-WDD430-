'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, Award, Shield, Leaf } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Supporting Artisans',
      description: 'We believe in fair compensation and sustainable livelihoods for talented creators worldwide.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Community',
      description: 'Connecting artisans from diverse cultures with conscious consumers around the world.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Craftsmanship',
      description: 'Every item is carefully crafted with attention to detail and traditional techniques.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Practices',
      description: 'Promoting eco-friendly materials and responsible production methods.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'Building lasting relationships through honest communication and reliable service.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Cultural Preservation',
      description: 'Helping preserve traditional crafts and cultural heritage for future generations.',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Handcrafted Haven</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to connect talented artisans with conscious consumers worldwide, 
            creating a marketplace where every purchase tells a story and supports local communities.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Handcrafted Haven was born from a simple belief: that every handcrafted item 
                carries the soul of its creator. We believe in the power of human connection 
                and the beauty of traditional craftsmanship.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform serves as a bridge between talented artisans and discerning customers 
                who appreciate the time, skill, and love that goes into creating something truly unique.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By supporting local artisans, we're not just selling products—we're preserving 
                cultural heritage, promoting sustainable practices, and building a global community 
                of creators and appreciators.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Artisan at work"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the community we're building.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-primary mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                alt="Handcrafted items"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                It all started with a simple observation: the world was becoming increasingly 
                digital, but people still craved authentic, meaningful connections and objects 
                with soul. We saw an opportunity to bridge the gap between traditional craftsmanship 
                and modern commerce.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What began as a small marketplace has grown into a vibrant community of artisans, 
                customers, and advocates for sustainable, ethical consumption. Every day, we're 
                inspired by the stories of our artisans and the joy their creations bring to customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Handcrafted Haven continues to evolve, always staying true to our core 
                mission: connecting people through the beauty of handcrafted art.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Artisans Supported</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Countries Represented</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage; 
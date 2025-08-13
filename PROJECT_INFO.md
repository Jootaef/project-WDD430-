# Handcrafted Haven - Group Project W02

## Project Overview

Handcrafted Haven is a comprehensive web application that serves as a platform for artisans and crafters to showcase and sell their unique handcrafted items. The application connects talented creators with potential customers who appreciate the beauty and quality of handmade products.

## Group Project Status: ✅ COMPLETED

### Completed Features

#### 🏠 **Home Page** (`/`)

- ✅ Hero section with compelling call-to-action
- ✅ Categories showcase with interactive icons
- ✅ Featured products grid
- ✅ Features section highlighting unique selling points
- ✅ Call-to-action section for user engagement

#### 🛍️ **Products Page** (`/products`)

- ✅ Advanced search and filtering system
- ✅ Category-based filtering
- ✅ Price range slider
- ✅ Sorting options (name, price, rating, newest)
- ✅ Grid and list view modes
- ✅ Responsive product grid
- ✅ Product count and filter indicators

#### 📱 **Product Details** (`/products/[id]`)

- ✅ High-quality product images with thumbnails
- ✅ Comprehensive product information
- ✅ Customization options with pricing
- ✅ Quantity controls
- ✅ Add to cart functionality
- ✅ Tabbed interface (Description, Reviews, Artisan Profile)
- ✅ Customer reviews display
- ✅ Artisan information and specialties

#### 👨‍🎨 **Artisans Page** (`/artisans`)

- ✅ Artisan profiles with avatars and bios
- ✅ Experience and rating information
- ✅ Specialty filtering
- ✅ Product previews for each artisan
- ✅ Statistics section
- ✅ Call-to-action for new artisans

#### 📞 **Contact Page** (`/contact`)

- ✅ Contact form with validation
- ✅ Business information display
- ✅ FAQ section with common questions
- ✅ Business hours and location
- ✅ Multiple contact methods
- ✅ Form submission handling

#### 🛒 **Shopping Cart** (`/cart`)

- ✅ Cart item management
- ✅ Quantity controls
- ✅ Price calculations with tax and shipping
- ✅ Customization support
- ✅ Order summary
- ✅ Checkout process
- ✅ Recommended products

#### ❤️ **Wishlist** (`/wishlist`)

- ✅ Wishlist item management
- ✅ Search and filtering
- ✅ Grid and list view modes
- ✅ Add to cart functionality
- ✅ Notes and personalization
- ✅ Bulk actions
- ✅ Sharing capabilities

### Technical Implementation

#### 🎨 **Design System**

- ✅ Consistent color palette (Warm Brown, Beige, Terracotta, Sky Blue, Sage Green)
- ✅ Typography using Inter font family
- ✅ Responsive design for all screen sizes
- ✅ Smooth animations with Framer Motion
- ✅ Modern UI components with Tailwind CSS

#### 🛠️ **Technology Stack**

- ✅ **Frontend**: Next.js 14 with React 18
- ✅ **Styling**: Tailwind CSS with custom components
- ✅ **Language**: TypeScript for type safety
- ✅ **State Management**: React hooks and local state
- ✅ **Animations**: Framer Motion for smooth interactions
- ✅ **Icons**: Lucide React and React Icons
- ✅ **Forms**: React Hook Form with validation

#### 📱 **User Experience**

- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Intuitive navigation and user flow
- ✅ Loading states and feedback
- ✅ Error handling and validation
- ✅ Accessibility considerations
- ✅ Performance optimization

### Project Structure

```
handcrafted-haven/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   │   ├── page.tsx       # Products listing
│   │   └── [id]/          # Product details
│   ├── artisans/          # Artisans page
│   ├── cart/              # Shopping cart
│   ├── wishlist/          # Wishlist
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── layout/            # Header, Footer
│   ├── products/          # Product components
│   └── ui/                # UI components
├── lib/                   # Utilities and data
│   ├── data.ts            # Mock data
│   ├── types.ts           # TypeScript types
│   └── store.ts           # State management
└── public/                # Static assets
```

### Data Models

#### 🏷️ **Product**

- ID, name, description, price
- Category, materials, dimensions
- Handmade and eco-friendly flags
- Rating and review count
- Artisan information
- Customization options

#### 👨‍🎨 **Artisan**

- ID, name, avatar, bio
- Rating, review count, experience
- Specialties and location
- Product gallery

#### 📝 **Review**

- Product association
- User information
- Rating and comment
- Date and optional images

#### 🛒 **Cart & Wishlist**

- Product references
- Quantity and customizations
- User notes and preferences

### Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ High contrast color schemes
- ✅ Responsive touch targets

### Performance Features

- ✅ Image optimization
- ✅ Lazy loading for components
- ✅ Efficient state management
- ✅ Optimized animations
- ✅ Responsive design patterns

### Future Enhancements

- 🔄 User authentication system
- 🔄 Real-time inventory management
- 🔄 Payment gateway integration
- 🔄 Order tracking system
- 🔄 Advanced search algorithms
- 🔄 Social media integration
- 🔄 Multi-language support

## Group Project Requirements Met

### ✅ **Software Development Skills**

- Comprehensive web application using full technology stack
- Modern development practices with TypeScript
- Component-based architecture
- State management and data flow

### ✅ **Effective Group Collaboration**

- Professional code structure
- Consistent coding standards
- Modular component design
- Clear documentation

### ✅ **Teaching and Learning**

- Shared understanding of project requirements
- Collaborative problem-solving
- Knowledge sharing through code reviews
- Best practices implementation

## Deployment Ready

The project is fully configured for deployment on platforms like:

- Vercel (recommended)
- Netlify
- Railway
- DigitalOcean App Platform

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Conclusion

Handcrafted Haven is a complete, production-ready web application that demonstrates modern web development practices, responsive design, and comprehensive e-commerce functionality. The project successfully meets all group project requirements and provides a solid foundation for future enhancements.

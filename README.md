# SweetTreats - Artisanal Bakery

A modern, responsive web application for an artisanal bakery showcasing delicious treats, expert bakers, and seamless ordering experience.

## 🎂 Features

### Core Functionality

- **Product Catalog**: Browse cakes, cupcakes, cookies, chocolates, and more
- **Advanced Filtering**: Filter by category, price, dietary restrictions (vegan, gluten-free)
- **Search & Sort**: Find products by name, description, or baker
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Wishlist**: Save favorite products for later
- **Product Details**: View ingredients, allergens, customizations, and reviews

### User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Real-time Updates**: Toast notifications for user feedback
- **Persistent State**: Cart and wishlist saved in localStorage

### Baker Profiles

- **Expert Showcase**: Detailed profiles of our talented bakers
- **Specialties**: View baker specialties and experience
- **Product Gallery**: See all products by each baker
- **Ratings & Reviews**: Customer feedback and ratings

## 🎨 Design System

### Color Palette

- **Primary**: #FF6B9D (Sweet Pink)
- **Secondary**: #FFF5E6 (Soft Cream)
- **Accent Colors**:
  - Orange: #FFB347 (Pastel Orange)
  - Blue: #87CEEB (Sky Blue)
  - Lavender: #DDA0DD (Lavender)

### Typography

- **Display**: Dancing Script (for brand elements)
- **Body**: Inter (for content)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
sweet-treats/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── bakers/            # Baker profiles
│   ├── contact/           # Contact form
│   └── wishlist/          # User wishlist
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── products/         # Product components
├── lib/                  # Utilities and data
│   ├── types.ts          # TypeScript types
│   ├── data.ts           # Mock data
│   └── store.ts          # Zustand stores
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sweet-treats
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages & Features

### Homepage (`/`)

- Hero section with call-to-action
- Featured products showcase
- Category exploration
- Why choose us section

### Products (`/products`)

- Advanced filtering system
- Search functionality
- Price range slider
- Dietary restriction filters
- Sorting options

### Product Details (`/products/[id]`)

- High-quality product images
- Detailed descriptions
- Ingredient lists
- Allergen information
- Customization options
- Customer reviews
- Baker information

### Shopping Cart (`/cart`)

- Item management
- Quantity controls
- Price calculations
- Checkout process
- Order summary

### Bakers (`/bakers`)

- Expert baker profiles
- Experience and specialties
- Product galleries
- Team statistics

### Wishlist (`/wishlist`)

- Saved products
- Move to cart functionality
- Wishlist summary
- Bulk actions

### Contact (`/contact`)

- Contact form
- Business information
- FAQ quick links
- Map placeholder

## 🎯 Key Features for Development

### Week 5 (Current)

- ✅ Complete homepage with hero section
- ✅ Product catalog with filtering
- ✅ Shopping cart functionality
- ✅ Responsive design implementation

### Week 6 (Planned)

- 🔄 Product detail pages with reviews
- 🔄 Baker profile pages
- 🔄 Advanced search and filtering
- 🔄 Wishlist functionality

### Week 7 (Planned)

- 📋 Contact form and information
- 📋 User authentication system
- 📋 Order tracking
- 📋 Performance optimization
- 📋 Deployment preparation

## 🎨 Customization

### Adding New Products

1. Add product data to `lib/data.ts`
2. Include high-quality images
3. Add baker information
4. Include ingredients and allergens

### Modifying Styles

- Update colors in `tailwind.config.js`
- Modify component styles in `app/globals.css`
- Customize animations in components

### Adding New Features

- Create new components in `components/`
- Add new pages in `app/`
- Update types in `lib/types.ts`
- Add state management in `lib/store.ts`

## 📊 Data Structure

### Product Object

```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  ingredients: string[];
  allergens: string[];
  isVegan: boolean;
  isGlutenFree: boolean;
  rating: number;
  reviewCount: number;
  baker: Baker;
  customizations?: Customization[];
  available: boolean;
}
```

### Baker Object

```typescript
{
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: ProductCategory[];
  experience: number;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Unsplash for beautiful food photography
- Lucide for elegant icons
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling

---

**SweetTreats** - Where every bite tells a story of passion and craftsmanship.

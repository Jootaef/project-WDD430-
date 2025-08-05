export interface Product {
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

export type ProductCategory = 
  | 'wedding-cakes'
  | 'cupcakes'
  | 'cookies'
  | 'chocolates'
  | 'vegan-desserts'
  | 'pies';

export interface Baker {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: ProductCategory[];
  experience: number; // years
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Customization {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderItem[];
  total: number;
  status: OrderStatus;
  deliveryDate: string;
  deliveryAddress: Address;
  specialInstructions?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  customizations: string[];
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  preferences: {
    dietaryRestrictions: string[];
    favoriteCategories: ProductCategory[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations: string[];
} 
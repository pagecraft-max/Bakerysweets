export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  description: string;
  isEggless: boolean;
  weight?: string;
  prepTime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  description: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  notes: string;
  paymentMethod: string;
}

export interface BusinessHour {
  day: string;
  time: string;
}

export interface BakeryInfo {
  name: string;
  slogan: string;
  subheading: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  currencySymbol: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  googleMapUrl: string;
  businessHours: BusinessHour[];
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

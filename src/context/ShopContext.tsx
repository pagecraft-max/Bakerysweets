import React, { createContext, useContext, useState, useEffect } from 'react';
import bakeryData from '../data/bakeryData.json';
import {
  Product,
  CartItem,
  Coupon,
  BakeryInfo,
  Category,
  Testimonial,
  FAQ,
  GalleryItem,
  ToastMessage,
  CustomerDetails
} from '../types';

interface ShopContextType {
  bakery: BakeryInfo;
  products: Product[];
  categories: Category[];
  coupons: Coupon[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  gallery: GalleryItem[];
  cart: CartItem[];
  wishlist: Product[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  discountAmount: number;
  grandTotal: number;
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  lightboxImage: { image: string; title: string } | null;
  setLightboxImage: (item: { image: string; title: string } | null) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  placeWhatsAppOrder: (customer: CustomerDetails) => void;
  lastOrder: {
    orderId: string;
    customer: CustomerDetails;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    discount: number;
    grandTotal: number;
    date: string;
  } | null;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bakery: BakeryInfo = bakeryData.bakery as BakeryInfo;
  const products: Product[] = bakeryData.products as Product[];
  const categories: Category[] = bakeryData.categories as Category[];
  const coupons: Coupon[] = bakeryData.coupons as Coupon[];
  const testimonials: Testimonial[] = bakeryData.testimonials as Testimonial[];
  const faqs: FAQ[] = bakeryData.faqs as FAQ[];
  const gallery: GalleryItem[] = bakeryData.gallery as GalleryItem[];

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aura_bakery_darkmode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_bakery_darkmode', JSON.stringify(darkMode));
    } catch {
      // Ignore storage restrictions
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_bakery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_bakery_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage restrictions
    }
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aura_bakery_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_bakery_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore storage restrictions
    }
  }, [wishlist]);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ image: string; title: string } | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Coupons
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const deliveryFee = cartSubtotal >= bakery.freeDeliveryThreshold || cartSubtotal === 0 ? 0 : bakery.deliveryFee;

  let discountAmount = 0;
  if (activeCoupon && cartSubtotal >= activeCoupon.minOrder) {
    if (activeCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * activeCoupon.value) / 100);
    } else {
      discountAmount = activeCoupon.value;
    }
  }

  const grandTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === trimmed);
    if (!found) {
      showToast('Invalid coupon code. Try WELCOME20 or FRESH10', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${found.code}`, 'error');
      return { success: false, message: `Minimum order of ₹${found.minOrder} required` };
    }
    setActiveCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Cart Handlers
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Wishlist Handlers
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  // WhatsApp Order
  const placeWhatsAppOrder = (customer: CustomerDetails) => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    const itemsText = cart
      .map(
        item =>
          `• ${item.product.name} x ${item.quantity} (₹${item.product.price * item.quantity})`
      )
      .join('\n');

    const message = `🍞 *New Bakery Order*

👤 *Customer Details*
Name: ${customer.name}
Phone: ${customer.phone}

📍 *Delivery Address*
Address: ${customer.address}
Landmark: ${customer.landmark || 'N/A'}
City: ${customer.city}
Pincode: ${customer.pincode}

🛒 *Items Ordered*
${itemsText}

-----------------------------
Subtotal: ₹${cartSubtotal}
Delivery Fee: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}
Discount: -₹${discountAmount}
*Grand Total: ₹${grandTotal}*
-----------------------------

Special Notes: ${customer.notes || 'None'}
Payment Method: Cash On Delivery

Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${bakery.whatsapp}?text=${encodedMessage}`;

    const orderRecord = {
      orderId: 'AURA-' + Math.floor(100000 + Math.random() * 900000),
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      grandTotal,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setLastOrder(orderRecord);
    clearCart();
    setIsSuccessModalOpen(true);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <ShopContext.Provider
      value={{
        bakery,
        products,
        categories,
        coupons,
        testimonials,
        faqs,
        gallery,
        cart,
        wishlist,
        darkMode,
        toggleDarkMode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        discountAmount,
        grandTotal,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        lightboxImage,
        setLightboxImage,
        toasts,
        showToast,
        removeToast,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        placeWhatsAppOrder,
        lastOrder,
        isSuccessModalOpen,
        setIsSuccessModalOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingActions: React.FC = () => {
  const { bakery, cart, setIsCartDrawerOpen } = useShop();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = `Hi ${bakery.name}, I would like to place an order or inquire about your fresh bakery items!`;
    window.open(`https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-[#2C221E] text-[#E2B158] dark:bg-[#FAF7F2] dark:text-[#2C221E] shadow-xl hover:scale-110 active:scale-95 transition-all"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${bakery.phone}`}
        className="pointer-events-auto p-3.5 rounded-full bg-amber-700 text-white shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        title="Call Bakery"
      >
        <Phone className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
          {bakery.phone}
        </span>
      </a>

      {/* Floating Mobile Cart Bar / Trigger */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="pointer-events-auto md:hidden p-3.5 rounded-full golden-gradient text-[#2C221E] shadow-xl hover:scale-110 active:scale-95 transition-all relative flex items-center justify-center"
          title="View Bag"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-[#2C221E] text-[#E2B158] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow">
            {totalItems}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="pointer-events-auto relative p-4 rounded-full bg-emerald-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        title="Order on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></span>
        <MessageCircle className="w-6 h-6 fill-current relative z-10" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold relative z-10">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Leaf, Clock, Scale, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    bakery,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi ${bakery.name}, I have a question about *${quickViewProduct.name}* (Price: ₹${quickViewProduct.price}). Could you please share more details?`;
    window.open(`https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#25201C] rounded-3xl shadow-2xl overflow-hidden border border-[#E2B158]/30 my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto bg-[#FAF7F2] dark:bg-[#1C1815]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {quickViewProduct.badge && (
                  <span className="bg-[#2C221E] text-[#E2B158] dark:bg-[#E2B158] dark:text-[#2C221E] text-xs font-bold px-3 py-1 rounded-full shadow">
                    {quickViewProduct.badge}
                  </span>
                )}
                {quickViewProduct.isEggless && (
                  <span className="bg-emerald-800 text-emerald-100 text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                    100% Eggless
                  </span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-wider">
                  {quickViewProduct.category}
                </span>

                <h2 className="font-serif-title text-2xl md:text-3xl font-bold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-center gap-3 mt-2 text-sm">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-gray-400">({quickViewProduct.reviewsCount} reviews)</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Additional Attributes */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                  {quickViewProduct.weight && (
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#9E6D22]" />
                      <span>Portion: <strong>{quickViewProduct.weight}</strong></span>
                    </div>
                  )}
                  {quickViewProduct.prepTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#9E6D22]" />
                      <span>Prep: <strong>{quickViewProduct.prepTime}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-[#E2B158]/20 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Price</span>
                    <span className="text-2xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
                      ₹{quickViewProduct.price}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E2B158]/40 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] p-1.5">
                    <button
                      onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
                      className="px-2 py-1 hover:bg-[#E2B158]/20 text-[#2C221E] dark:text-[#FAF7F2] rounded-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-2 py-1 hover:bg-[#E2B158]/20 text-[#2C221E] dark:text-[#FAF7F2] rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-xl golden-gradient text-[#2C221E] font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart (₹{quickViewProduct.price * quantity})
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 rounded-xl border border-[#E2B158]/40 transition-colors ${
                      isWishlisted ? 'bg-rose-500 text-white' : 'text-[#2C221E] dark:text-[#FAF7F2]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-600/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

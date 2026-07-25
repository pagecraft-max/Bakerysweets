import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Tag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    clearCart,
    activeCoupon
  } = useShop();

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#1C1815] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#E2B158]/30"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E2B158]/20 flex items-center justify-between bg-white dark:bg-[#25201C]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E6D22] dark:text-[#E2B158]" />
              <h2 className="font-serif-title text-xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                Your Order Bag
              </h2>
              <span className="text-xs bg-[#E2B158]/20 text-[#9E6D22] dark:text-[#E2B158] px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#2C221E] dark:text-[#FAF7F2]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#E2B158]/15 flex items-center justify-center text-[#9E6D22] dark:text-[#E2B158] mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif-title text-xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Looks like you haven't added any fresh baked treats yet. Explore our artisanal menu!
                </p>
                <Link
                  to="/menu"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-6 py-2.5 px-6 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs shadow hover:shadow-md transition-all"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white dark:bg-[#25201C] rounded-2xl border border-[#E2B158]/20 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif-title font-bold text-sm text-[#2C221E] dark:text-[#FAF7F2] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        ₹{item.product.price} each
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E2B158]/30 rounded-lg bg-[#FAF7F2] dark:bg-[#1C1815] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-xs hover:bg-[#E2B158]/20 rounded text-[#2C221E] dark:text-[#FAF7F2]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-xs hover:bg-[#E2B158]/20 rounded text-[#2C221E] dark:text-[#FAF7F2]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-[#2C221E] dark:text-[#FAF7F2]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-white dark:bg-[#25201C] border-t border-[#E2B158]/20 space-y-3">
              {activeCoupon && (
                <div className="flex items-center justify-between text-xs bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon '{activeCoupon.code}'</span>
                  </div>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C221E] dark:text-[#FAF7F2]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-[#2C221E] dark:text-[#FAF7F2]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#2C221E] dark:text-[#FAF7F2] pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Grand Total</span>
                  <span className="text-[#9E6D22] dark:text-[#E2B158]">₹{grandTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl border border-[#E2B158] text-[#2C221E] dark:text-[#FAF7F2] font-bold text-xs text-center hover:bg-[#E2B158]/10 transition-colors"
                >
                  View Full Cart
                </Link>

                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-rose-500 transition-colors py-1"
              >
                Clear Cart
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

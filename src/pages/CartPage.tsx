import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
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
    bakery
  } = useShop();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    applyCoupon(couponCode);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full golden-gradient flex items-center justify-center text-[#2C221E] mx-auto shadow-xl">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
          Your Cart is Currently Empty
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Explore our artisanal selection of Belgian chocolate cakes, butter croissants, sourdoughs, and French macarons!
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl golden-gradient text-[#2C221E] font-extrabold text-sm shadow-md hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Our Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2B158]/20 pb-6">
        <div>
          <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
            Your Selection
          </span>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
            Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          Clear Entire Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item Table / Cards */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="p-4 sm:p-5 bg-white dark:bg-[#25201C] rounded-3xl border border-[#E2B158]/20 shadow-xs flex flex-col sm:flex-row items-center gap-5"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-2xl shrink-0"
              />

              <div className="flex-1 space-y-1 text-center sm:text-left w-full">
                <span className="text-[10px] font-bold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-wider">
                  {item.product.category}
                </span>
                <h3 className="font-serif-title font-bold text-base sm:text-lg text-[#2C221E] dark:text-[#FAF7F2]">
                  {item.product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  ₹{item.product.price} each
                </p>
              </div>

              {/* Quantity Controls & Item Total */}
              <div className="flex sm:flex-col items-center justify-between sm:items-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800">
                <div className="flex items-center border border-[#E2B158]/40 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 text-xs hover:bg-[#E2B158]/20 rounded-lg text-[#2C221E] dark:text-[#FAF7F2]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 text-xs hover:bg-[#E2B158]/20 rounded-lg text-[#2C221E] dark:text-[#FAF7F2]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-base text-[#2C221E] dark:text-[#FAF7F2]">
                    ₹{item.product.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center text-xs">
            <Link
              to="/menu"
              className="text-[#9E6D22] dark:text-[#E2B158] font-bold hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Add More Bakery Items</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white dark:bg-[#25201C] p-6 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-3">
            <h3 className="font-serif-title text-lg font-bold text-[#2C221E] dark:text-[#FAF7F2] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#9E6D22] dark:text-[#E2B158]" />
              <span>Have a Promo Coupon?</span>
            </h3>

            {activeCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                    Coupon '{activeCoupon.code}' Applied
                  </span>
                  <span className="text-gray-500">{activeCoupon.description}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 font-bold hover:underline ml-2 text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Code: WELCOME20"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs uppercase font-bold text-[#2C221E] dark:text-[#FAF7F2] border border-[#E2B158]/30"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="text-[11px] text-gray-500 pt-1 space-y-1">
              <p>💡 Try: <strong className="text-[#9E6D22]">WELCOME20</strong> (20% OFF min ₹300) or <strong className="text-[#9E6D22]">AURA100</strong> (Flat ₹100 OFF min ₹600)</p>
            </div>
          </div>

          {/* Calculations Box */}
          <div className="bg-white dark:bg-[#25201C] p-6 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              {cartSubtotal < bakery.freeDeliveryThreshold && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 pt-1">
                  Add ₹{bakery.freeDeliveryThreshold - cartSubtotal} more for FREE delivery!
                </p>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-base font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
                <span>Grand Total</span>
                <span className="text-[#9E6D22] dark:text-[#E2B158]">₹{grandTotal}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full py-4 px-6 rounded-2xl golden-gradient text-[#2C221E] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

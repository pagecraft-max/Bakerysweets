import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ShieldCheck, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerDetails } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, deliveryFee, discountAmount, grandTotal, placeWhatsAppOrder, bakery } = useShop();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Mumbai',
    pincode: '',
    notes: '',
    paymentMethod: 'Cash On Delivery'
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-title text-2xl font-bold">Your cart is empty!</h2>
        <p className="text-xs text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/menu"
          className="inline-block py-3 px-6 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    placeWhatsAppOrder(customer);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2B158]/20 pb-6">
        <div>
          <Link to="/cart" className="text-xs text-[#9E6D22] dark:text-[#E2B158] font-bold flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </Link>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
            Order Checkout
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-300">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Direct WhatsApp Order</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Details Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#25201C] p-6 sm:p-8 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-6">
          <h2 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
            1. Delivery Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="e.g. 9820012345"
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
              Full Delivery Address *
            </label>
            <textarea
              required
              rows={3}
              value={customer.address}
              onChange={e => setCustomer({ ...customer, address: e.target.value })}
              placeholder="Flat no, Building name, Street address..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Landmark
              </label>
              <input
                type="text"
                value={customer.landmark}
                onChange={e => setCustomer({ ...customer, landmark: e.target.value })}
                placeholder="Near Park / Bank"
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={customer.city}
                onChange={e => setCustomer({ ...customer, city: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={customer.pincode}
                onChange={e => setCustomer({ ...customer, pincode: e.target.value })}
                placeholder="400050"
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
              Special Bakery Instructions / Custom Message
            </label>
            <input
              type="text"
              value={customer.notes}
              onChange={e => setCustomer({ ...customer, notes: e.target.value })}
              placeholder="e.g. Write 'Happy Birthday Anya' on cake, extra candles..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
            />
          </div>

          {/* Payment Method */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <h2 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
              2. Payment Method
            </h2>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] border-2 border-[#E2B158] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#2C221E] dark:text-[#FAF7F2]">
                    Cash On Delivery (COD) / Pay on WhatsApp
                  </h4>
                  <p className="text-xs text-gray-500">
                    Confirm your order via WhatsApp & pay upon fresh delivery.
                  </p>
                </div>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#25201C] p-6 sm:p-8 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-4">
            <h2 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
              Order Summary
            </h2>

            {/* Items Breakdown */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <span className="font-bold text-[#2C221E] dark:text-[#FAF7F2] block">
                        {item.product.name}
                      </span>
                      <span className="text-gray-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-300">
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
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-lg font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
                <span>Grand Total</span>
                <span className="text-[#9E6D22] dark:text-[#E2B158]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Order on WhatsApp</span>
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              Clicking "Order on WhatsApp" opens WhatsApp with your complete itemized order message pre-filled for {bakery.whatsappDisplay}.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, MessageCircle, X, Sparkles, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const SuccessModal: React.FC = () => {
  const { bakery, lastOrder, isSuccessModalOpen, setIsSuccessModalOpen } = useShop();

  if (!isSuccessModalOpen || !lastOrder) return null;

  const handleReopenWhatsApp = () => {
    const itemsText = lastOrder.items
      .map(
        item =>
          `• ${item.product.name} x ${item.quantity} (₹${item.product.price * item.quantity})`
      )
      .join('\n');

    const message = `🍞 *New Bakery Order*

👤 *Customer Details*
Name: ${lastOrder.customer.name}
Phone: ${lastOrder.customer.phone}

📍 *Delivery Address*
Address: ${lastOrder.customer.address}
Landmark: ${lastOrder.customer.landmark || 'N/A'}
City: ${lastOrder.customer.city}
Pincode: ${lastOrder.customer.pincode}

🛒 *Items Ordered*
${itemsText}

-----------------------------
Subtotal: ₹${lastOrder.subtotal}
Delivery Fee: ${lastOrder.deliveryFee === 0 ? 'FREE' : '₹' + lastOrder.deliveryFee}
Discount: -₹${lastOrder.discount}
*Grand Total: ₹${lastOrder.grandTotal}*
-----------------------------

Special Notes: ${lastOrder.customer.notes || 'None'}
Payment Method: Cash On Delivery

Please confirm my order.`;

    window.open(`https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          className="relative max-w-lg w-full bg-white dark:bg-[#25201C] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2B158]/30 text-center my-8"
        >
          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle2 className="w-12 h-12" />
            <Sparkles className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
          </div>

          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
            Order Sent to WhatsApp!
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
            Thank you, <strong className="text-[#2C221E] dark:text-[#FAF7F2]">{lastOrder.customer.name}</strong>! Order <span className="font-mono font-bold text-[#9E6D22] dark:text-[#E2B158]">{lastOrder.orderId}</span> has been formatted and redirected to WhatsApp.
          </p>

          {/* Order Summary Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] border border-[#E2B158]/20 text-left text-xs space-y-2">
            <div className="flex justify-between font-semibold text-gray-500">
              <span>Date: {lastOrder.date}</span>
              <span>Payment: COD</span>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-1 max-h-36 overflow-y-auto pr-1">
              {lastOrder.items.map((item: any) => (
                <div key={item.product.id} className="flex justify-between font-medium text-[#2C221E] dark:text-[#FAF7F2]">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between text-sm font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
              <span>Grand Total</span>
              <span className="text-[#9E6D22] dark:text-[#E2B158]">₹{lastOrder.grandTotal}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleReopenWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Re-open WhatsApp Chat
            </button>

            <Link
              to="/menu"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 px-6 rounded-xl border border-[#E2B158] text-[#2C221E] dark:text-[#FAF7F2] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#E2B158]/10 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Baking & Browsing
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

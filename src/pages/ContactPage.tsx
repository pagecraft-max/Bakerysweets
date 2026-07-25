import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { bakery, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    const whatsappMessage = `Hi ${bakery.name},
*Contact Form Inquiry*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Subject: ${formData.subject}

Message: ${formData.message}`;

    showToast('Redirecting your inquiry to WhatsApp...', 'success');
    window.open(`https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
          Contact Our Bakery
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Have a question regarding custom cake catering, corporate events, or bulk orders? Send us a message or chat with us directly on WhatsApp!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#25201C] p-6 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-4">
            <h3 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
              Bakery Details
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl golden-gradient text-[#2C221E] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">Address</h4>
                  <p>{bakery.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl golden-gradient text-[#2C221E] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">Phone Number</h4>
                  <a href={`tel:${bakery.phone}`} className="hover:underline">
                    {bakery.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">WhatsApp Direct</h4>
                  <a
                    href={`https://wa.me/${bakery.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-emerald-600 font-bold"
                  >
                    {bakery.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl golden-gradient text-[#2C221E] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C221E] dark:text-[#FAF7F2]">Email Address</h4>
                  <a href={`mailto:${bakery.email}`} className="hover:underline">
                    {bakery.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="bg-[#2C221E] text-[#FAF7F2] p-6 rounded-3xl border-2 border-[#E2B158]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#E2B158] font-serif-title text-xl font-bold">
              <Clock className="w-5 h-5" />
              <span>Baking & Delivery Hours</span>
            </div>
            <div className="space-y-1.5 text-xs text-gray-300">
              {bakery.businessHours.map((bh, i) => (
                <div key={i} className="flex justify-between border-b border-gray-700 pb-1">
                  <span>{bh.day}</span>
                  <span className="font-bold text-[#E2B158]">{bh.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form & Map */}
        <div className="lg:col-span-7 space-y-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#25201C] p-6 sm:p-8 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-4"
          >
            <h3 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Shah"
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
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 9820012345"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. vikram@example.com"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Custom Birthday Cake">Custom Birthday Cake</option>
                  <option value="Wedding / Catering Order">Wedding / Catering Order</option>
                  <option value="Corporate Bulk Order">Corporate Bulk Order</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your custom order details, guest count, or questions..."
                className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl golden-gradient text-[#2C221E] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message on WhatsApp</span>
            </button>
          </form>

          {/* Map Embed */}
          <div className="h-72 rounded-3xl overflow-hidden border border-[#E2B158]/30 shadow-sm">
            <iframe
              title="Bakery Location Map"
              src={bakery.googleMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

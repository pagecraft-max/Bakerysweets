import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  Award,
  Sparkles,
  Truck,
  ShieldCheck,
  ChevronDown,
  Instagram,
  Clock,
  MapPin,
  CheckCircle,
  MessageCircle,
  Utensils
} from 'lucide-react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { bakery, products, testimonials, faqs, gallery } = useShop();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const featuredProducts = products.filter(p => p.badge === 'Bestseller' || p.badge === "Chef's Special").slice(0, 8);

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Master French Pastry Chefs',
      desc: 'Trained in Paris, bringing traditional French techniques and artistic perfection to every bake.'
    },
    {
      icon: Sparkles,
      title: '100% Natural & Organic',
      desc: 'We use non-bleached stoneground flours, Normandy butter, Valrhona dark chocolate, and zero additives.'
    },
    {
      icon: Truck,
      title: 'Baked Fresh Hourly & Delivered',
      desc: 'Never stored overnight. We bake in small batches throughout the day for maximum aroma and crispness.'
    },
    {
      icon: ShieldCheck,
      title: 'Strict Quality Guarantee',
      desc: 'If your treat isn’t completely delicious, soft, and fresh, we’ll replace it on WhatsApp instantly.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#FAF7F2] dark:bg-[#1C1815] overflow-hidden pt-8 pb-12 border-b border-[#E2B158]/20">
        {/* Background Subtle Glows */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#E2B158]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9E6D22]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B158]/20 text-[#9E6D22] dark:text-[#E2B158] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gourmet Patisserie & Boulangerie</span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] leading-[1.15]">
              {bakery.slogan}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {bakery.subheading} Order handcrafted cakes, flaky butter croissants, and organic sourdough breads with 1-click WhatsApp delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/menu"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl golden-gradient text-[#2C221E] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Full Menu</span>
              </Link>

              <a
                href={`https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent('Hi ' + bakery.name + ', I would like to order fresh baked items!')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E2B158]/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1.5 font-bold">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span>4.9 / 5 Rating (1,200+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Fresh Daily Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#25201C]">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"
                alt="Artisan Pastries"
                className="w-full h-full object-cover"
              />

              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl golden-gradient flex items-center justify-center text-[#2C221E] font-bold text-xl shrink-0">
                  🥐
                </div>
                <div>
                  <h4 className="font-serif-title font-bold text-sm text-[#2C221E] dark:text-[#FAF7F2]">
                    Fresh Morning Bake Batch
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Butter Croissants & Dark Chocolate Fudge ready for instant delivery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
              Handcrafted Daily
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
              Best Sellers & Chef Specialties
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E6D22] dark:text-[#E2B158] hover:underline"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white dark:bg-[#25201C] py-16 border-y border-[#E2B158]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
              The Aura Difference
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
              Why Our Bakery Is Loved By Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] border border-[#E2B158]/20 hover:border-[#E2B158] transition-all hover:shadow-lg flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl golden-gradient flex items-center justify-center text-[#2C221E]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-title text-xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Freshly Baked Every Day & Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C221E] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 border-2 border-[#E2B158]/30 relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2B158]">
              Traditional French Artistry
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold leading-tight">
              Baked Fresh Every Morning with Love & Mastery
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Every loaf of sourdough undergoes a 36-hour slow cold fermentation process to unlock complex flavors and optimal digestibility. Our croissants are rolled with 81 precise buttery layers, giving you that golden shatter when you bite in.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E2B158]/20">
              <div>
                <span className="font-serif-title text-3xl font-extrabold text-[#E2B158]">50+</span>
                <p className="text-xs text-gray-300">Daily Varieties</p>
              </div>
              <div>
                <span className="font-serif-title text-3xl font-extrabold text-[#E2B158]">15k+</span>
                <p className="text-xs text-gray-300">Happy Clients</p>
              </div>
              <div>
                <span className="font-serif-title text-3xl font-extrabold text-[#E2B158]">12+</span>
                <p className="text-xs text-gray-300">Years Experience</p>
              </div>
              <div>
                <span className="font-serif-title text-3xl font-extrabold text-[#E2B158]">100%</span>
                <p className="text-xs text-gray-300">Natural Ingredients</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E2B158]/20">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
              alt="Baker preparing sourdough"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
            Loved By Connoisseurs
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#25201C] border border-[#E2B158]/20 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E2B158]"
                />
                <div>
                  <h4 className="font-serif-title font-bold text-sm text-[#2C221E] dark:text-[#FAF7F2]">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#9E6D22] dark:text-[#E2B158]">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
              @aurartisanbakery
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
              Follow Our Daily Baking Journey
            </h2>
          </div>
          <a
            href={bakery.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-4 rounded-xl border border-[#E2B158] text-[#2C221E] dark:text-[#FAF7F2] font-bold text-xs flex items-center gap-2 hover:bg-[#E2B158]/10 transition-colors"
          >
            <Instagram className="w-4 h-4 text-rose-500" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {gallery.slice(0, 6).map(g => (
            <div
              key={g.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-[#1C1815] cursor-pointer"
            >
              <img
                src={g.image}
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="font-serif-title text-3xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#25201C] border border-[#E2B158]/20 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif-title font-bold text-base sm:text-lg text-[#2C221E] dark:text-[#FAF7F2] flex items-center justify-between gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9E6D22] dark:text-[#E2B158] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Map & Hours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#25201C] rounded-3xl p-6 sm:p-8 border border-[#E2B158]/20 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
                Visit Our Flagship Store
              </span>
              <h2 className="font-serif-title text-3xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
                Warm Ovens & Friendly Smiles
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9E6D22] shrink-0 mt-0.5" />
                <span>{bakery.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#9E6D22] shrink-0" />
                <div>
                  {bakery.businessHours.map((bh, i) => (
                    <p key={i}>
                      <strong>{bh.day}:</strong> {bh.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${bakery.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs shadow hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          <div className="w-full h-72 rounded-2xl overflow-hidden border border-[#E2B158]/30 shadow">
            <iframe
              title="Bakery Location Map"
              src={bakery.googleMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

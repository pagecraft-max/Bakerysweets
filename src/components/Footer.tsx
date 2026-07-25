import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cake,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Heart,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { bakery, categories, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Thank you for subscribing to our bakery newsletter!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#2C221E] text-[#FAF7F2] pt-16 pb-12 border-t-4 border-[#E2B158]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E2B158]/20">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center text-[#2C221E] font-bold">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif-title text-2xl font-bold tracking-tight text-[#FAF7F2]">
                {bakery.name}
              </span>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed">
              {bakery.slogan}. Crafting traditional French pastries, artisanal sourdoughs, and bespoke cakes daily with organic ingredients.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={bakery.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#E2B158] hover:text-[#2C221E] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={bakery.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#E2B158] hover:text-[#2C221E] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={bakery.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#E2B158] hover:text-[#2C221E] transition-all"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${bakery.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#E2B158]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-[#E2B158] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#E2B158] transition-colors">
                  Our Menu & Specialties
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E2B158] transition-colors">
                  About Our Master Bakers
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#E2B158] transition-colors">
                  Visual Gallery Lightbox
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#E2B158] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E2B158] transition-colors">
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#E2B158]">
              Visiting Us
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E2B158] shrink-0 mt-0.5" />
                <span>{bakery.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E2B158] shrink-0" />
                <a href={`tel:${bakery.phone}`} className="hover:underline">
                  {bakery.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E2B158] shrink-0" />
                <a href={`mailto:${bakery.email}`} className="hover:underline">
                  {bakery.email}
                </a>
              </div>

              <div className="pt-2 border-t border-[#E2B158]/20 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-[#E2B158]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Baking Hours</span>
                </div>
                {bakery.businessHours.map((bh, idx) => (
                  <p key={idx} className="text-[11px] text-gray-400">
                    {bh.day}: {bh.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#E2B158]">
              Bakery Newsletter
            </h4>
            <p className="text-xs text-gray-300">
              Subscribe to get secret weekly recipes, fresh menu additions, and special promo codes.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 text-white placeholder-gray-400 text-xs border border-[#E2B158]/30 focus:outline-none focus:border-[#E2B158]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg golden-gradient text-[#2C221E] font-bold text-xs flex items-center justify-center hover:scale-105 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-gray-400">
                🔒 No spam, ever. Unsubscribe at any time.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {bakery.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Baked with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for French Patisserie Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

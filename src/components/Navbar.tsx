import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
  Cake,
  PhoneCall,
  Search
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    bakery,
    cart,
    wishlist,
    darkMode,
    toggleDarkMode,
    setIsCartDrawerOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Announcement Top Bar */}
      <div className="bg-[#2C221E] text-[#E2B158] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#E2B158]/20 dark:bg-[#1A1513]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#E2B158] animate-pulse"></span>
        <span>Freshly Baked Every Morning • Free Delivery on orders above ₹{bakery.freeDeliveryThreshold}</span>
        <span className="hidden sm:inline-block ml-2 text-[#FAF7F2]/80">| Call Us: {bakery.phone}</span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/90 dark:bg-[#1C1815]/90 backdrop-blur-md shadow-md py-3'
            : 'bg-[#FAF7F2] dark:bg-[#1C1815] py-4'
        } border-b border-[#E2B158]/15`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full golden-gradient flex items-center justify-center text-[#2C221E] shadow-md group-hover:scale-105 transition-transform">
              <Cake className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-title text-2xl font-bold tracking-tight text-[#2C221E] dark:text-[#FAF7F2] leading-none">
                {bakery.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#9E6D22] dark:text-[#E2B158]">
                Patisserie & Boulangerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#9E6D22] dark:text-[#E2B158] font-semibold'
                      : 'text-[#2C221E]/80 dark:text-[#FAF7F2]/80 hover:text-[#9E6D22] dark:hover:text-[#E2B158]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E2B158] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <Link
              to="/menu"
              className="p-2 rounded-full hover:bg-[#E2B158]/15 text-[#2C221E] dark:text-[#FAF7F2] transition-colors"
              title="Search Menu"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#E2B158]/15 text-[#2C221E] dark:text-[#FAF7F2] transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/menu?filter=wishlist"
              className="p-2 rounded-full hover:bg-[#E2B158]/15 text-[#2C221E] dark:text-[#FAF7F2] transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2.5 rounded-full golden-gradient text-[#2C221E] font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline-block text-xs font-bold">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-[#2C221E] text-[#E2B158] text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-[#E2B158]/15 text-[#2C221E] dark:text-[#FAF7F2]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF7F2] dark:bg-[#1C1815] border-b border-[#E2B158]/20 overflow-hidden sticky top-[73px] z-30 shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 border-b border-[#E2B158]/10 flex items-center justify-between ${
                    location.pathname === link.path
                      ? 'text-[#9E6D22] dark:text-[#E2B158] font-bold'
                      : 'text-[#2C221E] dark:text-[#FAF7F2]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-[#9E6D22] dark:text-[#E2B158]">→</span>
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={`tel:${bakery.phone}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#E2B158]/30 font-medium text-sm text-[#2C221E] dark:text-[#FAF7F2]"
                >
                  <PhoneCall className="w-4 h-4 text-[#9E6D22]" />
                  Call Us: {bakery.phone}
                </a>

                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl golden-gradient text-[#2C221E] font-bold text-sm shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  View Cart ({totalCartCount} items)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { FloatingActions } from './components/FloatingActions';
import { ScrollProgress } from './components/ScrollProgress';
import { ToastContainer } from './components/ToastContainer';
import { SuccessModal } from './components/SuccessModal';

// Pages
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <HashRouter>
      <ShopProvider>
        <ScrollToTopOnRoute />
        <ScrollProgress />
        
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C221E] dark:bg-[#1C1815] dark:text-[#FAF7F2] transition-colors duration-300">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Overlays & Drawers */}
          <CartDrawer />
          <QuickViewModal />
          <ImageLightboxModal />
          <SuccessModal />
          <FloatingActions />
          <ToastContainer />
        </div>
      </ShopProvider>
    </HashRouter>
  );
}

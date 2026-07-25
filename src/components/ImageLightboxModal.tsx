import React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const ImageLightboxModal: React.FC = () => {
  const { lightboxImage, setLightboxImage } = useShop();

  if (!lightboxImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl w-full flex flex-col items-center gap-4"
        >
          <img
            src={lightboxImage.image}
            alt={lightboxImage.title}
            className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <h3 className="font-serif-title text-2xl font-bold text-[#E2B158] text-center">
            {lightboxImage.title}
          </h3>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

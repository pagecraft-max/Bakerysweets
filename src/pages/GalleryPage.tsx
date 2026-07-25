import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const GalleryPage: React.FC = () => {
  const { gallery, setLightboxImage } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pastries', 'Cakes', 'Bread', 'Cupcakes', 'Donuts'];

  const filteredGallery =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter(g => g.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
          Visual Patisserie Showroom
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
          Bakery Gallery
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Tap any creation to open our high-resolution lightbox view and explore our daily bakes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'golden-gradient text-[#2C221E] shadow-md scale-105'
                : 'bg-white dark:bg-[#25201C] text-[#2C221E] dark:text-[#FAF7F2] border border-[#E2B158]/20 hover:border-[#E2B158]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGallery.map(item => (
          <div
            key={item.id}
            onClick={() => setLightboxImage({ image: item.image, title: item.title })}
            className="group relative aspect-4/3 rounded-3xl overflow-hidden bg-[#FAF7F2] dark:bg-[#1C1815] cursor-pointer border border-[#E2B158]/20 shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center gap-2">
              <Eye className="w-8 h-8 text-[#E2B158]" />
              <h3 className="font-serif-title text-xl font-bold">{item.title}</h3>
              <span className="text-xs bg-[#E2B158] text-[#2C221E] font-bold px-3 py-1 rounded-full uppercase">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

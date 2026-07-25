import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, Home, Utensils } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-24 h-24 rounded-full golden-gradient flex items-center justify-center text-[#2C221E] shadow-2xl animate-bounce">
        <Cake className="w-12 h-12" />
      </div>

      <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
        404 Error
      </span>

      <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
        Oops! This page got overbaked or eaten!
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
        The page or baked treat you are searching for might have been moved or removed from our oven shelf.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="py-3.5 px-8 rounded-2xl golden-gradient text-[#2C221E] font-extrabold text-xs flex items-center gap-2 shadow hover:scale-105 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Warm Oven (Home)</span>
        </Link>

        <Link
          to="/menu"
          className="py-3.5 px-8 rounded-2xl border border-[#E2B158] text-[#2C221E] dark:text-[#FAF7F2] font-bold text-xs flex items-center gap-2 hover:bg-[#E2B158]/10 transition-colors"
        >
          <Utensils className="w-4 h-4" />
          <span>Explore Fresh Menu</span>
        </Link>
      </div>
    </div>
  );
};

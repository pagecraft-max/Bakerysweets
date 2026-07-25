import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Heart, Leaf, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const MenuPage: React.FC = () => {
  const { products, categories, wishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter');

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(filterParam === 'wishlist');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        // Search query
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Max Price
        if (p.price > maxPrice) {
          return false;
        }
        // Eggless
        if (egglessOnly && !p.isEggless) {
          return false;
        }
        // Wishlist
        if (showWishlistOnly && !wishlist.some(w => w.id === p.id)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, maxPrice, egglessOnly, showWishlistOnly, wishlist, sortBy]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1000);
    setEgglessOnly(false);
    setShowWishlistOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
          Handcrafted Daily
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
          Our Artisanal Menu
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          From French butter croissants to Belgian dark chocolate fudge cakes, browse our complete selection of fresh oven bakes.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white dark:bg-[#25201C] p-4 rounded-3xl border border-[#E2B158]/20 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search cakes, pastries, sourdough..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs font-medium text-[#2C221E] dark:text-[#FAF7F2] border border-[#E2B158]/30 focus:outline-none focus:border-[#E2B158]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-4 flex items-center gap-3 px-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap">
              Max Price: ₹{maxPrice}
            </span>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E2B158] cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#9E6D22] dark:text-[#E2B158]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2] border border-[#E2B158]/30 focus:outline-none focus:border-[#E2B158]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles: Eggless Only & Wishlist Only */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEgglessOnly(prev => !prev)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                egglessOnly
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#FAF7F2] dark:bg-[#1C1815] text-emerald-800 dark:text-emerald-300 border border-emerald-300/40'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Eggless Only</span>
            </button>

            <button
              onClick={() => setShowWishlistOnly(prev => !prev)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                showWishlistOnly
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#FAF7F2] dark:bg-[#1C1815] text-rose-600 dark:text-rose-300 border border-rose-300/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>

          {(selectedCategory !== 'all' || searchQuery || maxPrice < 1000 || egglessOnly || showWishlistOnly) && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#9E6D22] dark:text-[#E2B158] font-bold hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`py-2.5 px-5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'golden-gradient text-[#2C221E] shadow-md scale-105'
                  : 'bg-white dark:bg-[#25201C] text-[#2C221E] dark:text-[#FAF7F2] border border-[#E2B158]/20 hover:border-[#E2B158]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#25201C] rounded-3xl border border-[#E2B158]/20">
          <Filter className="w-12 h-12 text-[#9E6D22] dark:text-[#E2B158] mx-auto mb-3" />
          <h3 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
            No baked goods match your filters
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, increasing the max price range, or selecting a different category.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 py-2.5 px-6 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs shadow"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Plus, Minus, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(product.id);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="group relative bg-white dark:bg-[#25201C] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E2B158]/20 flex flex-col justify-between h-full">
      {/* Image Container */}
      <div
        className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2] dark:bg-[#1C1815] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Darkener on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={e => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-3 rounded-full bg-white/90 text-[#2C221E] hover:bg-[#E2B158] transition-colors shadow-lg"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="bg-[#2C221E] text-[#E2B158] dark:bg-[#E2B158] dark:text-[#2C221E] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              {product.badge}
            </span>
          )}
          {product.isEggless && (
            <span className="bg-emerald-800 text-emerald-100 text-[11px] font-semibold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-300" />
              Eggless
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-[#1C1815]/80 text-[#2C221E] dark:text-white hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#9E6D22] dark:text-[#E2B158] font-semibold uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif-title text-lg font-bold text-[#2C221E] dark:text-[#FAF7F2] line-clamp-1 cursor-pointer hover:text-[#9E6D22] dark:hover:text-[#E2B158] transition-colors"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Price & Quantity & Add to Cart */}
        <div className="pt-2 border-t border-[#E2B158]/15 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Price</span>
              <span className="text-lg font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
                ₹{product.price}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border border-[#E2B158]/40 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] p-1">
              <button
                onClick={handleDecrement}
                className="p-1 hover:bg-[#E2B158]/20 text-[#2C221E] dark:text-[#FAF7F2] rounded-lg transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1 hover:bg-[#E2B158]/20 text-[#2C221E] dark:text-[#FAF7F2] rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs flex items-center justify-center gap-2 shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#25201C] rounded-2xl overflow-hidden border border-[#E2B158]/20 p-4 space-y-4 shadow-xs">
      <div className="skeleton aspect-4/3 rounded-xl w-full" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton h-6 w-20 rounded" />
        <div className="skeleton h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
};

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="skeleton aspect-square rounded-2xl w-full" />
  );
};

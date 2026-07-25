import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, Quote } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, showToast } = useShop();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }
    showToast('Thank you! Your review has been submitted for moderation.', 'success');
    setName('');
    setRole('');
    setComment('');
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#E2B158]/20 pb-8">
        <div>
          <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
            Verified Feedback
          </span>
          <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
            Customer Reviews
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Read real stories from our community of pastry lovers and sourdough enthusiasts.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(prev => !prev)}
          className="py-3 px-6 rounded-2xl golden-gradient text-[#2C221E] font-bold text-xs flex items-center gap-2 shadow hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Leave a Review</span>
        </button>
      </div>

      {/* Review Submission Form Modal */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#25201C] p-6 sm:p-8 rounded-3xl border border-[#E2B158]/30 shadow-xl max-w-xl mx-auto space-y-4"
        >
          <h3 className="font-serif-title text-2xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
            Share Your Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                Tag / Profession
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Croissant Lover"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-lg text-amber-500 hover:scale-110 transition-transform ${
                    star <= rating ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
              Your Review *
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Tell us what you enjoyed about our fresh bakery items..."
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1815] text-xs border border-[#E2B158]/30 text-[#2C221E] dark:text-[#FAF7F2]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="py-2.5 px-5 rounded-xl border border-gray-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#25201C] border border-[#E2B158]/20 shadow-sm flex flex-col justify-between gap-6 relative"
          >
            <Quote className="w-10 h-10 text-[#E2B158]/20 absolute top-4 right-4" />

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

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#E2B158]"
              />
              <div>
                <h4 className="font-serif-title font-bold text-base text-[#2C221E] dark:text-[#FAF7F2]">
                  {item.name}
                </h4>
                <span className="text-xs text-[#9E6D22] dark:text-[#E2B158] font-medium">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

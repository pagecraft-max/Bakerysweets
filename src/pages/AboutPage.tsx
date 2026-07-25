import React from 'react';
import { Award, Heart, Sparkles, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { bakery } = useShop();

  const masterChefs = [
    {
      name: 'Chef Laurent Dubois',
      title: 'Executive Pastry Chef',
      bio: 'Trained at École Lenôtre in Paris with 15+ years of experience in Michelin-starred French patisseries.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Chef Sophie Moreau',
      title: 'Master Sourdough Artisan',
      bio: 'Specialist in 36-hour cold stoneground sourdough fermentation and traditional European crusts.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const milestones = [
    { year: '2012', title: 'First Parisian Oven Fired Up', desc: 'Started as a boutique bakery in Bandra with 3 classic bread recipes.' },
    { year: '2016', title: 'Voted Best French Bakery', desc: 'Awarded City Culinary Gold for French Butter Croissants & Macarons.' },
    { year: '2020', title: 'Eggless Gourmet Patisserie Line', desc: 'Innovated 100% eggless formulations that preserve authentic French texture.' },
    { year: '2024+', title: '15,000+ Happy Customers', desc: 'Delivering fresh artisan bakes daily with 1-click WhatsApp convenience.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
          Our Heritage & Passion
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
          The Story of {bakery.name}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Founded on a deep respect for traditional French baking, we bring organic unbleached flours, Normandy butter, and 36-hour fermentation to every table in Mumbai.
        </p>
      </div>

      {/* Grid Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-[#25201C] p-8 rounded-3xl border border-[#E2B158]/20 shadow-md">
        <div className="space-y-6">
          <span className="text-xs font-bold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-wider">
            Uncompromising Quality
          </span>
          <h2 className="font-serif-title text-3xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2]">
            Pure Ingredients, Zero Compromise
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            We reject pre-made mixes, artificial stabilizers, and palm oils. Every single item—from our Belgian dark chocolate cakes to our garlic herb focaccia—is prepared from scratch using single-origin cacao, real cream, and pure sea salt.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] border border-[#E2B158]/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#9E6D22]" />
              <span className="text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2]">100% Organic Flours</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1815] border border-[#E2B158]/20 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#9E6D22]" />
              <span className="text-xs font-bold text-[#2C221E] dark:text-[#FAF7F2]">Normandy Cultured Butter</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E2B158]/30">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
            alt="Bakery Craftsmanship"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Master Chefs */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-[#9E6D22] dark:text-[#E2B158] uppercase tracking-widest">
            Meet the Masters
          </span>
          <h2 className="font-serif-title text-3xl font-extrabold text-[#2C221E] dark:text-[#FAF7F2] mt-1">
            Our Head Pastry Chefs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {masterChefs.map((chef, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#25201C] border border-[#E2B158]/20 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-28 h-28 rounded-2xl object-cover shrink-0 border-2 border-[#E2B158]"
              />
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif-title text-xl font-bold text-[#2C221E] dark:text-[#FAF7F2]">
                  {chef.name}
                </h3>
                <span className="text-xs font-bold text-[#9E6D22] dark:text-[#E2B158] block">
                  {chef.title}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {chef.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="bg-[#2C221E] text-[#FAF7F2] p-8 sm:p-12 rounded-3xl border-2 border-[#E2B158]/30 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif-title text-3xl font-extrabold text-[#E2B158]">
            Our Journey of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-[#E2B158]/20 space-y-2">
              <span className="font-serif-title text-3xl font-extrabold text-[#E2B158]">
                {m.year}
              </span>
              <h4 className="font-serif-title font-bold text-base text-[#FAF7F2]">{m.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

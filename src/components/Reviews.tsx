
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { SectionId } from '../types';

const Reviews: React.FC = () => {
  return (
    <section id={SectionId.REVIEWS} className="py-24 px-6 md:px-20 bg-white relative z-10 border-t border-forest-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-forest-600 font-semibold mb-4 bg-forest-50 px-4 py-2 rounded-full">
            <Star size={16} fill="currentColor" />
            <span>Gästeerlebnisse</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">Das sagen unsere Gäste</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Echte Erlebnisse von Menschen, die hier ihre Auszeit genossen haben.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id}
              className="bg-forest-100/60 p-8 rounded-2xl relative hover:-translate-y-2 transition-transform duration-300 border border-forest-100 hover:border-forest-200 hover:shadow-lg backdrop-blur-sm"
            >
              <Quote 
                size={40} 
                className="absolute top-6 right-6 text-forest-300/50" 
              />
              
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-forest-900 mb-8 leading-relaxed relative z-10 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-forest-200/50 pt-6 mt-auto">
                <div className="w-10 h-10 bg-forest-200 rounded-full flex items-center justify-center text-forest-800 font-bold shadow-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-forest-900">{review.name}</div>
                  <div className="text-xs text-forest-600 uppercase tracking-wide">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

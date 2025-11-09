import React from 'react';
import { Star } from 'lucide-react';
import type{ Testimonial } from '../models/index';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <div className="w-full py-16 bg-gray-800/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
          Lo que Dicen Nuestros Clientes
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Historias reales de gamers y profesionales tech
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[#252525] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(Math.round(testimonial.rating))].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
              ))}
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-200">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
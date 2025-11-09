import React from 'react';
import type { CategoryCard } from '../models/index';

interface CategoriesSectionProps {
  categories: CategoryCard[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <div className="w-full py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">Explora Nuestras Categorías</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Descubre nuestra selección de tecnología de última generación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative h-80 rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90 mb-4">{category.description}</p>
              <button className="self-start px-6 py-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-lg transition-all duration-300 text-white font-medium border border-white/30">
                Explorar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
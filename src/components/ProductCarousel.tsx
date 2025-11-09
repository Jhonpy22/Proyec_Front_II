import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type{ Producto } from '../models/index';

interface ProductCarouselProps {
  title: string;
  products: Producto[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 340;
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  return (
    <div className="w-full py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200">{title}</h2>
        <button className="hidden md:flex border border-[#0d7a9a] text-[#0d7a9a] hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors">
          Ver Todo →
        </button>
      </div>

      <div className="relative">
        <div ref={containerRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-80 group">
              <div className="relative h-80 bg-gray-800 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Agregar a favoritos"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      favorites.includes(product.id) ? "fill-[#0d7a9a] text-[#0d7a9a]" : "text-gray-700"
                    }`}
                  />
                </button>

                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full rounded-none bg-[#0d7a9a] hover:bg-[#0d7a9a]/90 text-white py-3">
                    Agregar al Carrito
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-400 font-medium">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-200 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-[#0d7a9a]">₡{product.price}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-300">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-6 top-1/3 -translate-y-1/2 z-10 bg-[#0d7a9a] hover:bg-[#0d7a9a]/90 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-6 top-1/3 -translate-y-1/2 z-10 bg-[#0d7a9a] hover:bg-[#0d7a9a]/90 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
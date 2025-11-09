import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import type{ Slide } from '../models/index';

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Innovación Tecnológica",
      subtitle: "Descubre las mejores laptops y computadoras del mercado",
      image: "https://i.ibb.co/DH2jB8Nt/Guia-para-armar-tu-primer-setup-gamer-en-Ecuador.webp",
      buttonText: "Ver Laptops",
    },
    {
      id: 2,
      title: "Componentes Premium",
      subtitle: "GPUs, procesadores y accesorios para el gaming",
      image: "https://i.ibb.co/qYhyfvPS/gaming-pc-components-rgb-lighting.jpg",
      buttonText: "Explorar Componentes",
    },
    {
      id: 3,
      title: "Accesorios Profesionales",
      subtitle: "Periféricos de última generación para tu setup",
      image: "https://i.ibb.co/1tscLfbm/M314-1080x.webp",
      buttonText: "Ver Accesorios",
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl mt-16">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-[#ff4444]" />
              <span className="text-[#ff4444] font-semibold text-sm">CYBER INNOVATION</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl">{slide.title}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">{slide.subtitle}</p>
            <button className="bg-[#ff4444] hover:bg-[#ff4444]/90 text-white px-8 py-3 text-lg rounded-lg transition-colors">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-[#0d7a9a]/30 hover:bg-[#0d7a9a]/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-[#0d7a9a]/30 hover:bg-[#0d7a9a]/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setAutoPlay(false);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-[#ff4444] w-8" : "bg-white/30 w-3 hover:bg-white/60"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
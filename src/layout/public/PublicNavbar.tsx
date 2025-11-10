import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { Link }     from '@tanstack/react-router';

export const PublicNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Productos", href: "#" },
    { label: "Componentes", href: "#" },
    { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#1a1a1a]/95 backdrop-blur-md border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-[#0d7a9a] tracking-tighter">
              CYBER<span className="text-[#ff4444]">NOVA</span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-[#0d7a9a] transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} className="text-gray-300" />
            </button>
            <Link to="/login" from="/" className='p-2 hover:bg-gray-800 rounded-lg transition-colors' aria-label="Iniciar sesión">
              <User size={20} className="text-gray-300" />
            </Link>
            <button 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={20} className="text-gray-300" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-[#ff4444] text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Menú"
            >
              {isOpen ? <X size={24} className="text-gray-300" /> : <Menu size={24} className="text-gray-300" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
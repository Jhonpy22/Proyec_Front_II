
import type { CategoryCard, Producto, Testimonial } from '../models';
import { PublicNavbar } from '../layout/public/PublicNavbar';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductCarousel } from '../components/ProductCarousel';
import { CategoriesSection } from '../components/CategoriesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsletterSection } from '../components/NewsletterSection';


export default function LandingPage() {
    const laptopsProducts: Producto[] = [
    {
      id: 1,
      name: "Alienware x16 R1",
      category: "Gaming",
      price: '1.028.684',
      image: "https://i.ibb.co/BVGTcqDD/alienware-x16-r1-gjc8.jpg",
      rating: 4.9,
    },
    {
      id: 2,
      name: "MacBook Pro 16 M4",
      category: "Profesional",
      price: '1.749.000',
      image: "https://i.ibb.co/yBM8FMKG/w-NCj9ur-RKMRdrsj-Csm-Si9-L.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "ASUS ROG Zephyrus Duo 16",
      category: "Gaming",
      price: '15,000,000',
      image: "https://i.ibb.co/3yjRQhDY/asus-rog-zephyrus-duo-16-2023-za8u-1920.webp",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Dell XPS 15",
      category: "Profesional",
      price: '1.314.790',
      image: "https://i.ibb.co/tMwznYBF/dell-xps-15-9530-2023-tdg5-1920.webp",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Razer Blade Stealth",
      category: "Gaming",
      price: '1.015.960',
      image: "https://i.ibb.co/k6H15wSN/mchin-181015-4105-0011-0.webp",
      rating: 4.8,
    },
  ];

  const componentesProducts: Producto[] = [
    {
      id: 6,
      name: "RTX 4090 Graphics Card",
      category: "GPU",
      price: '1.658.213',
      image: "https://i.ibb.co/qFBt07Rp/nvidia-graphics-card-rgb.jpg",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Intel Core i9-14900K",
      category: "Procesador",
      price: '331.820',
      image: "https://i.ibb.co/VWfCwfQt/processor-cpu-intel.jpg",
      rating: 5,
    },
    {
      id: 8,
      name: "Corsair DDR5 32GB Kit",
      category: "Memoria RAM",
      price: '150.675',
      image: "https://i.ibb.co/W4tNyTyp/gaming-ram-rgb-memory.jpg",
      rating: 4.8,
    },
    {
      id: 9,
      name: "Samsung 990 Pro 2TB NVMe",
      category: "Almacenamiento",
      price: '219.960',
      image: "https://i.ibb.co/RkZJt2yZ/nvme-ssd-storage.jpg",
      rating: 4.7,
    },
    {
      id: 10,
      name: "NOCTUA CPU Cooler",
      category: "Refrigeración",
      price: '96.900',
      image: "https://i.ibb.co/cSGJKCNC/premium-cpu-cooler.jpg",
      rating: 4.8,
    },
  ];

  const categories: CategoryCard[] = [
    {
      id: 1,
      name: "Laptops Gaming",
      image: "https://i.ibb.co/wrP4HWks/gaming-laptop-dark-gaming-setup.jpg",
      description: "Alto rendimiento para gaming extremo y streaming",
    },
    {
      id: 2,
      name: "Componentes PC",
      image: "https://i.ibb.co/q3YHDJMP/pc-components-gpu-cpu-motherboard.jpg",
      description: "Piezas premium para construir tu PC de ensueño",
    },
    {
      id: 3,
      name: "Periféricos Pro",
      image: "https://i.ibb.co/sJm3n60F/Periferico-PRO.png",
      description: "Accesorios profesionales para gaming y trabajo",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Streamer Pro",
      image: "https://i.ibb.co/H1YQCPM/modern-person-icon-user-and-anonymous-icon-vector.jpg",
      text: "CyberNova tiene el mejor stock y precios en tech. Mi setup gaming nunca fue igual.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sofia Chen",
      role: "Desarrolladora",
      image: "https://i.ibb.co/H1YQCPM/modern-person-icon-user-and-anonymous-icon-vector.jpg",
      text: "Excelente servicio técnico. Encontré exactamente lo que necesitaba para mi workstation.",
      rating: 5,
    },
    {
      id: 3,
      name: "Alex Ortiz",
      role: "Tech Enthusiast",
      image: "https://i.ibb.co/H1YQCPM/modern-person-icon-user-and-anonymous-icon-vector.jpg",
      text: "La mejor tienda de tecnología. Calidad, precio y asesoramiento incomparable.",
      rating: 4.8,
    },
  ];

    return (
      <main className="min-h-screen bg-[#1a1a1a]">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <HeroCarousel />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductCarousel title="Laptops Premium" products={laptopsProducts} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#003d4d]/10">
        <ProductCarousel title="Componentes de Alto Rendimiento" products={componentesProducts} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CategoriesSection categories={categories} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <TestimonialsSection testimonials={testimonials} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NewsletterSection />
      </div>
    </main>
  );
    
}

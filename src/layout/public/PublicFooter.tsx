
import { Mail, MapPin, Phone } from 'lucide-react'

export default function PublicFooter() {
  return (
   <footer className="bg-[#003d4d] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                CYBER<span className="text-[#ff4444]">NOVA</span>
              </h3>
              <p className="text-white/80 leading-relaxed">La mejor tecnología al mejor precio</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tienda</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition">Laptops</a></li>
                <li><a href="#" className="hover:text-white transition">Componentes</a></li>
                <li><a href="#" className="hover:text-white transition">Periféricos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition">Acerca de</a></li>
                <li><a href="#" className="hover:text-white transition">Blog Tech</a></li>
                <li><a href="#" className="hover:text-white transition">Empleos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-3 text-white/80">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+506 8120 2299</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>support@cybernova.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Guanacaste, Costa Rica</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-white/80 text-sm">
            <p>© 2025 CyberNova. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacidad</a>
              <a href="#" className="hover:text-white transition">Términos</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
		
  )
}

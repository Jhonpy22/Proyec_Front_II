import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="w-full py-16">
      <div className="bg-gradient-to-r from-[#0d7a9a] to-[#003d4d] rounded-2xl p-12 md:p-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Suscríbete a las Novedades Tech
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Recibe las últimas tendencias en tecnología, promociones exclusivas y lanzamientos de productos
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-none text-gray-800 placeholder:text-gray-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-white text-[#0d7a9a] hover:bg-gray-100 px-8 py-3 font-semibold rounded-lg transition-colors"
            >
              {submitted ? "¡Gracias!" : "Suscribir"}
            </button>
          </div>

          {submitted && (
            <p className="mt-4 text-green-100 font-medium">✓ Confirmación enviada a tu correo</p>
          )}
        </div>
      </div>
    </div>
  );
};
import { Zap, Shield, Users, Target } from "lucide-react"

export default function AboutPage() {
    const values = [
        {
            icon: Zap,
            title: "Innovación",
            description: "Siempre ofrecemos la última tecnología y productos más innovadores del mercado",
        },
        {
            icon: Shield,
            title: "Confiabilidad",
            description: "Garantía total en todos nuestros productos con soporte técnico 24/7",
        },
        {
            icon: Users,
            title: "Comunidad",
            description: "Conectamos a gamers, profesionales y entusiastas tech alrededor del mundo",
        },
        {
            icon: Target,
            title: "Calidad",
            description: "Seleccionamos cuidadosamente cada producto para garantizar excelencia",
        },
    ]

    return (
        <main className="min-h-screen bg-[#1a1a1a]">
            
            <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d7a9a]/20 via-transparent to-[#003d4d]/20 pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in-up text-balance text-white">
                        Somos <span className="text-[#FF4444]">CyberNova</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-in-up leading-relaxed">
                        La tienda de tecnología premium donde gamers, profesionales y entusiastas encuentran las mejores marcas y el
                        mejor servicio
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up">
                        <a href="/" className="px-8 py-3 bg-[#0d7a9a] hover:bg-[#0d7a9a]/90 text-white rounded-lg font-semibold transition">
                            Conocer productos
                        </a>
                        <a href="/"className="px-8 py-3 border border-[#0d7a9a] text-[#0d7a9a] hover:bg-[#0d7a9a]/10 rounded-lg font-semibold transition">
                            Contactar ventas
                        </a>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-[#2a2a2a]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-in-left">
                            <h2 className="text-4xl font-bold mb-6 text-white">Nuestra Historia</h2>
                            <p className="text-[#ffffff] leading-relaxed mb-4">
                                Fundada en 2015, CyberNova nació con una misión simple: conectar a los entusiastas de la tecnología con
                                los mejores productos del mercado. Lo que comenzó como una pequeña tienda en Nicoya se ha
                                convertido en el destino principal para gamers y profesionales tech.
                            </p>
                            <p className="text-[#ffffff] leading-relaxed">
                                Hoy en día, distribuimos más de 500 marcas premium, servimos a miles de clientes en todo el pais y
                                mantenemos el mismo compromiso: pasión por la tecnología, excelencia en el servicio y comunidad.
                            </p>
                        </div>
                        <div className="h-96 bg-gradient-to-br from-[#0d7a9a]/20 to-[#FF4444]/20 rounded-xl border border-[#0d7a9a]/30 flex items-center justify-center">
                            <img
                                src="https://i.ibb.co/hFkfJ6qD/el-tesoro-fachada.jpg"
                                alt="CyberNova store"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-[#1a1a1a]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white">Misión & Visión</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#2a2a2a] border border-[#0d7a9a]/30 rounded-xl p-8 hover:border-[#0d7a9a]/60 transition">
                            <div className="w-16 h-16 bg-[#0d7a9a]/20 rounded-lg flex items-center justify-center mb-6">
                                <Target className="text-[#0d7a9a]" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Misión</h3>
                            <p className="text-[#ffffff] leading-relaxed">
                                Proporcionar a gamers, desarrolladores y entusiastas de la tecnología acceso a productos premium de las
                                mejores marcas, con asesoramiento experto y soporte excepcional para elevar su experiencia tech.
                            </p>
                        </div>
                        <div className="bg-[#2a2a2a] border border-[#FF4444]/30 rounded-xl p-8 hover:border-[#FF4444]/60 transition">
                            <div className="w-16 h-16 bg-[#FF4444]/20 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="text-[#FF4444]" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Visión</h3>
                            <p className="text-[#ffffff] leading-relaxed">
                                Ser la tienda de tecnología más confiable y admirada del mundo, donde la innovación, la calidad y la
                                comunidad se unen para crear experiencias inolvidables.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-[#2a2a2a]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white">Nuestros Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, idx) => {
                            const Icon = value.icon
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6 hover:border-[#0d7a9a]/50 transition hover:shadow-lg hover:shadow-[#0d7a9a]/10"
                                >
                                    <div className="w-12 h-12 bg-[#0d7a9a]/20 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="text-[#0d7a9a]" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-white">{value.title}</h3>
                                    <p className="text-[#ececec] text-sm leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

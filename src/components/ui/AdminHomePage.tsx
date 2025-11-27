import { FaRocket, FaBox, FaCreditCard } from "react-icons/fa";

interface WelcomeCardProps {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    link: string;
}

export default function AdminHomePage() {
    return (
        <div className="p-10 min-h-screen text-white">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-4 bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent ">
                    Bienvenido al Panel Administrativo
                </h1>

                <p className="text-gray-300 text-lg mb-10">
                    Gestiona productos, tarjetas y controla la simulación en tiempo real.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <WelcomeCard
                        title="Simulador"
                        desc="Controla el proceso de compras automáticas."
                        icon={FaRocket}
                        link="/admin/simulation"
                    />

                    <WelcomeCard
                        title="Productos"
                        desc="Administra el catálogo de productos."
                        icon={FaBox}
                        link="/admin/products"
                    />

                    <WelcomeCard
                        title="Tarjetas"
                        desc="Gestiona las tarjetas de compra."
                        icon={FaCreditCard}
                        link="/admin/cards"
                    />

                </div>

            </div>
        </div>
    );
}

function WelcomeCard({ title, desc, icon: Icon, link }: WelcomeCardProps) {
    return (
        <a
            href={link}
            className="block bg-[#161B22] p-6 rounded-xl border border-[#00A3FF]/20 hover:border-[#00A3FF] 
        shadow-lg hover:shadow-[0_0_15px_#00A3FF] transition-all"
        >
            <div className="text-4xl mb-3">
                <Icon className="w-10 h-10 text-[#00A3FF]" />
            </div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-400 mt-1">{desc}</p>
        </a>
    );
}
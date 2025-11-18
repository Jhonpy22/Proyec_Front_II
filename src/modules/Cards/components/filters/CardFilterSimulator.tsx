import { useState } from "react";

import { MdCreditCard } from "react-icons/md";


interface Props {
    onTypeSearch: (text: string) => void;
}

export default function CardFilterSimulator({ onTypeSearch}: Props) {

    const [typeValue, setTypeValue] = useState("");


    return (
        <div className="w-full mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="text-cyan-300 font-semibold mb-2 flex items-center gap-2">
                        <MdCreditCard className="w-5 h-5 text-cyan-400" />
                        Nombre de tarjeta
                    </label>
                    <input
                        type="text"
                        value={typeValue}
                        placeholder="Ej: Visa, MasterCard, etc."
                        onChange={(e) => {
                            setTypeValue(e.target.value);
                            onTypeSearch(e.target.value);
                        }}
                        className="w-full bg-slate-900/60 border border-cyan-500/40 rounded-lg px-4 py-2 
                            text-white placeholder-gray-500 
                            focus:outline-none focus:border-cyan-400 
                            focus:ring-2 focus:ring-cyan-500/30 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

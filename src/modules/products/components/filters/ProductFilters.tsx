import { Box } from "lucide-react";
import { useState } from "react";

import { BsFillBagCheckFill } from "react-icons/bs";


interface Props {
    onSearch: (text: string) => void;
    onQuantitySearch: (text: string) => void;
}

export default function ProductFilter({ onSearch, onQuantitySearch }: Props) {
    const [nameValue, setNameValue] = useState("");
    const [quantityValue, setQuantityValue] = useState("");

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="flex flex-col">
                    <label className=" text-cyan-300 font-semibold mb-2 flex items-center gap-2">
                        <Box className="w-5 h-5 text-cyan-400" />Nombre del producto
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Monitor... "
                        value={nameValue}
                        onChange={(e) => {
                            setNameValue(e.target.value);
                            onSearch(e.target.value);
                        }}
                        className="w-full bg-slate-900/60 border border-cyan-500/40 rounded-lg px-4 py-2 
                            text-white placeholder-gray-500 
                            focus:outline-none focus:border-cyan-400 
                            focus:ring-2 focus:ring-cyan-500/30 transition-all"
                    />
                </div>
                <div className="flex flex-col">
                    <label className=" text-cyan-300 font-semibold mb-2 flex items-center gap-2"><BsFillBagCheckFill className="w-5 h-5 text-cyan-400" />
                        Cantidad
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: 222..."
                        value={quantityValue}
                        onChange={(e) => {
                            setQuantityValue(e.target.value);
                            onQuantitySearch(e.target.value);
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

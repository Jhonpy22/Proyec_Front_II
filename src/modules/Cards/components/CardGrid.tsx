import CreditCard from "./CreditCard";
import type { CardResponse } from "../../../models";
import { FaAddressCard } from "react-icons/fa";

export default function CardGrid({ rows }: { rows: CardResponse[] }) {
    if (!rows?.length) {
        return (
            <div className="rounded-xl border-2 border-dashed border-blue-300 bg-white/60 p-8 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                    <FaAddressCard className="h-7 w-7 text-blue-600 animate-bounce" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                    No hay productos disponibles.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rows.map(card => (
                <CreditCard key={card.card_Id} card={card} />
            ))}
        </div>
    );
}

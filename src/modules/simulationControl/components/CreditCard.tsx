import React from "react";
import type { Card } from "../services/cardService";

interface CreditCardProps {
  card: Card;
}

const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  const [previousMoney, setPreviousMoney] = React.useState(card.money);
  const [isUpdating, setIsUpdating] = React.useState(false);

  React.useEffect(() => {
    if (card.money !== previousMoney) {
      setIsUpdating(true);
      setPreviousMoney(card.money);
      const timer = setTimeout(() => setIsUpdating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [card.money, previousMoney]);

  const formatCardNumber = (n: string) =>
    n.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || n;

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
    }).format(amount);

  const getCardColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("visa")) return "from-blue-600 to-blue-800";
    if (t.includes("master")) return "from-red-600 to-orange-500";
    if (t.includes("discover")) return "from-amber-500 to-yellow-600";
    if (t.includes("american")) return "from-emerald-500 to-emerald-700";
    return "from-gray-600 to-gray-700";
  };

  return (
    <div
      className={`relative w-full h-48 bg-gradient-to-br ${getCardColor(
        card.card_Type
      )} rounded-2xl shadow-xl p-6 text-white transition-all ${
        isUpdating ? "ring-4 ring-green-400 ring-opacity-80" : ""
      }`}
    >
      <div className="flex justify-between">
        <span className="text-xs opacity-70">Tarjeta</span>
        <span className="bg-white text-black px-2 py-1 rounded font-bold">
          {card.card_Type.toUpperCase()}
        </span>
      </div>

      <p className="mt-4 text-xl font-mono tracking-widest">
        {formatCardNumber(card.card_Number)}
      </p>

      <div className="flex justify-between mt-6 text-sm">
        <div>
          <span className="opacity-70 block">EXP</span>
          {new Date(card.expiration_Date).toLocaleDateString("es-CR")}
        </div>

        <div className="text-right">
          <span className="opacity-70 block">SALDO</span>
          <span className="text-lg font-bold">{formatMoney(card.money)}</span>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

import { Dialog, Transition } from "@headlessui/react";
import type { CardResponse } from "../../../../models/index";
import { Fragment } from "react";
import { Calendar, DollarSign, X } from "lucide-react";
import { TbListDetails } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { formatDate } from "../../../../utils/FormatDate";

type Props = {
    open: boolean;
    onClose: () => void;
    card: CardResponse | null;
};

export default function ViewAdjustmentModal({ open, onClose, card }: Props) {
    if (!open || !card) return null;

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>

                
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                </Transition.Child>

            
                <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >

                        <Dialog.Panel
                            className="w-full max-w-2xl rounded-xl 
                         bg-gradient-to-br from-slate-900 to-slate-800 
                         border border-cyan-500/20 shadow-xl p-6"
                        >

                           
                            <div className="flex items-center justify-between mb-4">
                                <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-2">
                                    <TbListDetails className="h-5 w-5 text-cyan-400" />
                                    Detalle de la tarjeta
                                </Dialog.Title>

                                <button
                                    onClick={onClose}
                                    title="Cerrar"
                                    className="rounded-lg p-2 text-gray-300 hover:text-white hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                <DataItem label="Nombre de tarjeta" value={card.card_Type} icon={FaAddressCard} />
                                <DataItem label="Número de la tarjeta" value={card.card_Number} icon={MdCreditCard} />
                                <DataItem label="Dinero disponible" value={card.money} icon={DollarSign} />
                                <DataItem label="Fecha de expiración" value={formatDate(card.expiration_Date)} icon={Calendar} />
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg bg-slate-700 text-gray-200 
                             hover:bg-slate-600 transition"
                                >
                                    Cerrar
                                </button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>
    );
}

function DataItem({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
}) {
    return (
        <div className="flex gap-3 items-start p-4 rounded-lg 
                    bg-slate-800/80 border border-slate-700 shadow-sm">

            <div className="shrink-0 rounded-lg bg-slate-700 text-cyan-400 p-2">
                <Icon className="w-4 h-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[12px] font-semibold tracking-wide uppercase text-gray-400">
                    {label}
                </p>

                <p className="mt-1 text-[15px] leading-relaxed text-gray-100 break-words">
                    {value}
                </p>
            </div>
        </div>
    );
}

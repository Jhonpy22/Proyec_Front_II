import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { CardResponse } from "../../../../models";
import { X } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import UpdateCardForm from "../forms/UpdateCardForm";

const FORMUPDATE_ID = "update-card-form";

type Props = {
    open: boolean;
    onClose: () => void;
    card: CardResponse | null;
};

export default function EditCardModal({ open, onClose, card }: Props) {
    const [pending, setPending] = useState(false);

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

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    
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
                            className="w-full max-w-lg p-6 rounded-xl 
                            bg-gradient-to-br from-slate-900 to-slate-800 
                            shadow-xl border border-cyan-500/20"
                        >

                            
                            <div className="flex items-center justify-between mb-5">
                                <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FaRegEdit className="text-cyan-400" />
                                    Editar Tarjeta
                                </Dialog.Title>

                                <button
                                    onClick={onClose}
                                    title="Cerrar"
                                    className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            
                            <div className="space-y-6">

                                <UpdateCardForm
                                    key={card.card_Id}
                                    formUpdateId={FORMUPDATE_ID}
                                    onPendingChange={setPending}
                                    card={card}
                                    onSuccess={onClose}
                                />

                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="submit"
                                    form={FORMUPDATE_ID}
                                    disabled={pending}
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg 
                                hover:bg-teal-700 transition font-medium shadow-lg disabled:opacity-50"
                                >
                                    {pending ? "Guardando..." : "Guardar"}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-slate-700 text-gray-200 rounded-lg 
                                hover:bg-slate-600 transition font-medium"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>
    );
}

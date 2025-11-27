import { Dialog, Transition } from "@headlessui/react";
import type { ProductResponse } from '../../../../models/index';
import EditProductForm from '../forms/EditForm';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';
import { FaRegEdit } from 'react-icons/fa';

const FORMUPDATE_ID = 'update-product-form';

type Props = {
    open: boolean;
    onClose: () => void;
    product: ProductResponse | null;
};

export default function EditProductModal({ open, onClose, product }: Props) {
    const [pending, setPending] = useState(false);

    if (!open || !product) return null;

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>

                {/* OVERLAY */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
                </Transition.Child>

                {/* CENTER WRAPPER */}
                <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">

                    {/* PANEL */}
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
                            className="w-full max-w-lg rounded-xl p-6 
                                       bg-gradient-to-br from-slate-900 to-slate-800 
                                       border border-cyan-500/20 shadow-xl"
                        >

                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-4">
                                <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FaRegEdit className="text-cyan-400" />
                                    Editar Producto
                                </Dialog.Title>

                                <button
                                    onClick={onClose}
                                    title="Cerrar"
                                    className="rounded-lg p-2 text-gray-300 hover:text-white hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* FORM */}
                            <div className="mt-2">
                                <EditProductForm
                                    key={product.product_Id}
                                    formUpdateId={FORMUPDATE_ID}

                                    onPendingChange={setPending}
                                    product={product}
                                    readOnlyCode={false}
                                    onSuccess={onClose}
                                />
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="submit"
                                    form={FORMUPDATE_ID}
                                    disabled={pending}
                                    className="px-4 py-2 rounded-lg text-white 
                                               bg-teal-600 hover:bg-teal-500 
                                               shadow-md shadow-teal-500/20
                                               disabled:opacity-50 transition"
                                >
                                    {pending ? 'Guardando…' : 'Guardar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg bg-slate-700 text-gray-200 
                                               hover:bg-slate-600 transition"
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

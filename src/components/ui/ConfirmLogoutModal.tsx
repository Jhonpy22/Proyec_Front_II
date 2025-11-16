import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmLogoutModal({ open, onClose, onConfirm }: Props) {
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg shadow-xl border border-cyan-500/20">

              <Dialog.Title className="text-lg font-semibold text-white">
                ¿Cerrar sesión?
              </Dialog.Title>

              <p className="mt-2 text-sm text-gray-400">
                Tu sesión se cerrará inmediatamente.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-gray-200 font-medium"
                >
                  Cancelar
                </button>

                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
                >
                  Cerrar sesión
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>

      </Dialog>
    </Transition>
  );
}


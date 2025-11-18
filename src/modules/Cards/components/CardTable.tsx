import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import type { CardResponse } from "../../../models/index";
import {  DollarSign, Calendar, Eye, Pencil } from 'lucide-react';
import { FiMoreVertical } from "react-icons/fi";
import { FaAddressCard, FaRegIdBadge } from "react-icons/fa";


type Props = {
    rows: CardResponse[];
    onView: (row: CardResponse) => void;
    onEdit: (row: CardResponse) => void;
};

export default function CardTable({ rows, onView, onEdit }: Props) {
    const h = createColumnHelper<CardResponse>();
    const columns = [
        h.accessor("card_Id", {
            header: () => (
                <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
                    <FaRegIdBadge className="w-5 h-5 text-cyan-400" />
                    ID
                </div>
            ),
            cell: (i) => <span className="font-semibold text-white">{i.getValue()}</span>,
        }),
        h.accessor("card_Type", {
            header: () => (
                <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
                    <FaAddressCard className="w-5 h-5 text-cyan-400" />
                    Nombre tarjeta
                </div>
            ),
            cell: (i) => <span className="font-semibold text-white">{i.getValue()}</span>,
        }),

        h.accessor("money", {
            header: () => (
                <div className="flex items-center justify-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
                    <DollarSign className="w-5 h-5 " />
                    Dinero
                </div>
            ),
            cell: (i) => (
                <div className="flex items-center justify-center">
                    <span className="font-bold text-white-400">₡{Number(i.getValue()).toLocaleString("es-CR")}</span>
                </div>
            ),
        }),
        h.accessor("expiration_Date", {
            header: () => (
                <div className="flex items-center justify-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Exp.
                </div>
            ),
            cell: (i) => {
                const date = new Date(i.getValue());
                return (
                    <div className="flex items-center justify-center">
                        <span className="text-gray-300 font-medium">{date.toLocaleDateString("es-CR")}</span>
                    </div>
                );
            },
        }),
        h.display({
            id: 'actions',
            header: () => (
                <div className="flex items-center justify-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
                    <FiMoreVertical className="w-5 h-5 text-cyan-400" />
                    Acciones
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center gap-2 items-center">
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-lg shadow-cyan-500/50 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/80 whitespace-nowrap"
                        onClick={() => onView(row.original)}
                    >
                        <Eye className="w-4 h-4" />
                        Ver
                    </button>
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-lg shadow-gray-500/50 transition-all duration-200 hover:scale-105 hover:shadow-gray-500/80 whitespace-nowrap"
                        onClick={() => onEdit(row.original)}
                    >
                        <Pencil className="w-4 h-4" />
                        Editar
                    </button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (!rows?.length) {
        return (
            <div className="rounded-xl border-2 border-dashed border-blue-300 bg-white/60 p-8 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                    <FaAddressCard className="h-7 w-7 text-blue-600 animate-bounce" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                    No hay tarjetas disponibles.
                </p>
            </div>
        );
    }
    return (
        <div className="overflow-x-auto rounded-xl shadow-2xl shadow-cyan-500/40 border border-cyan-500/60 transition-all duration-300 mt-6 backdrop-blur-sm">
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-lg overflow-hidden">
                <div className="grid grid-cols-[70px_170px_160px_170px_160px] gap-4 px-6 py-4 border-b border-cyan-500/40 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950">
                    {table.getHeaderGroups().map(hg => (
                        hg.headers.map(hc => (
                            <div key={hc.id} className="font-bold tracking-widest uppercase text-sm flex items-center">
                                {flexRender(hc.column.columnDef.header, hc.getContext())}
                            </div>
                        ))
                    ))}
                </div>

                <div className="divide-y divide-cyan-500/20">
                    {table.getRowModel().rows.map((r) => (
                        <div
                            key={r.id}
                            className="grid grid-cols-[70px_180px_150px_200px_160px] gap-4 px-6 py-4 hover:bg-cyan-950/40 transition-all duration-300 border-cyan-500/20 group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {r.getVisibleCells().map(c => (
                                <div
                                    key={c.id}
                                    className="text-gray-100 align-middle relative z-10 flex items-center"
                                >
                                    {flexRender(c.column.columnDef.cell, c.getContext())}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

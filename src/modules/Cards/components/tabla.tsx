import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { CardDto } from "../../../models/index";
import { Tag, Package, Hash, DollarSign, Calendar,  } from "lucide-react";

type Props = {
  rows: CardDto[];
};

export default function ProductsTable({ rows }: Props) {
  const h = createColumnHelper<CardDto>();
  const columns = [
    h.accessor("card_Id", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <Hash className="w-4 h-4" />
          ID
        </div>
      ),
      cell: (i) => i.getValue(),
    }),

    h.accessor("card_Type", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[25ch]">
          <Package className="w-4 h-4" />
          Tipo de tarjeta
        </div>
      ),
      cell: (i) => <span className="font-medium">{i.getValue()}</span>,
    }),

    h.accessor("card_Number", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <Tag className="w-4 h-4" />
          Numero de tarjeta
        </div>
      ),
      cell: (i) => i.getValue(),
    }),

    h.accessor("money", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <DollarSign className="w-4 h-4" />
          Precio
        </div>
      ),
      cell: (i) => <span>₡{Number(i.getValue()).toLocaleString("es-CR")}</span>,
    }),
    h.accessor("expiration_Date", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <Calendar className="w-4 h-4" />
          Fecha de expiración
        </div>
      ),
      cell: (i) => {
        const date = new Date(i.getValue());
        return <span>{date.toLocaleDateString("es-CR")}</span>;
      },
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
          <Package className="h-7 w-7 text-blue-600 animate-bounce" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          No hay productos disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border-2 border-[#0077B6] shadow-lg shadow-[#0077B6]/30 transition-all duration-300 mt-6">
      <table className="min-w-full table-fixed bg-white border border-[#0077B6] rounded-md overflow-hidden text-sm">
        <thead className="bg-[#0077B6] text-white">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((hc) => (
                <th
                  key={hc.id}
                  className="px-4 py-3 border border-[#00B4D8] text-left font-semibold tracking-wide uppercase shadow-sm"
                >
                  {flexRender(hc.column.columnDef.header, hc.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-[#CAF0F8]">
          {table.getRowModel().rows.map((r) => (
            <tr
              key={r.id}
              className="hover:bg-[#90E0EF]/60 transition duration-300 ease-in-out transform hover:scale-[1.01]"
            >
              {r.getVisibleCells().map((c) => (
                <td
                  key={c.id}
                  className="px-4 py-3 border border-[#CAF0F8] text-[#03045E] align-middle"
                >
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

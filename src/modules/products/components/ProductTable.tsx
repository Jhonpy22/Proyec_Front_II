import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ProductResponse } from "../../../models";
import { Tag, Package, Hash, DollarSign } from "lucide-react";

type Props = {
  rows: ProductResponse[];
};

export default function ProductsTable({ rows }: Props) {
  const h = createColumnHelper<ProductResponse>();

  const columns = [
    h.accessor("product_Id", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <Hash className="w-4 h-4" />
          ID
        </div>
      ),
      cell: i => i.getValue(),
    }),

    h.accessor("product_Name", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[25ch]">
          <Package className="w-4 h-4" />
          Nombre
        </div>
      ),
      cell: i => <span className="font-medium">{i.getValue()}</span>,
    }),

    h.accessor("quantity", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <Tag className="w-4 h-4" />
          Cantidad
        </div>
      ),
      cell: i => i.getValue(),
    }),

    h.accessor("price", {
      header: () => (
        <div className="flex items-center gap-1 text-white w-[10ch]">
          <DollarSign className="w-4 h-4" />
          Precio
        </div>
      ),
      cell: i => (
        <span>₡{Number(i.getValue()).toLocaleString("es-CR")}</span>
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
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(hc => (
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
          {table.getRowModel().rows.map(r => (
            <tr
              key={r.id}
              className="hover:bg-[#90E0EF]/60 transition duration-300 ease-in-out transform hover:scale-[1.01]"
            >
              {r.getVisibleCells().map(c => (
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

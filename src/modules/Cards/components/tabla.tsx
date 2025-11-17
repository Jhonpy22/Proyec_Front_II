import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  title?: string;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "success" | "danger";
    icon?: React.ReactNode;
  }[];
}

const Tabla = <T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  emptyMessage = "No hay datos disponibles",
  isLoading = false,
  striped = true,
  hoverable = true,
  bordered = false,
  compact = false,
  title,
  actions,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getActionButtonClass = (variant?: string) => {
    const baseClass =
      "px-4 py-2 rounded-lg font-medium transition-all shadow-md flex items-center space-x-2";
    switch (variant) {
      case "primary":
        return `${baseClass} bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700`;
      case "success":
        return `${baseClass} bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700`;
      case "danger":
        return `${baseClass} bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700`;
      case "secondary":
      default:
        return `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#5a5a5a]">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || actions) && (
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex justify-between items-center">
              {title && (
                <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
              )}
              {actions && (
                <div className="flex space-x-3">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={getActionButtonClass(action.variant)}
                    >
                      {action.icon && <span>{action.icon}</span>}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        {data.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-sm mb-4">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {emptyMessage}
            </h3>
            <p className="text-gray-500">
              No se encontraron registros para mostrar
            </p>
          </div>
        ) : (
          <div
            className={`overflow-x-auto ${
              bordered ? "border border-gray-200 rounded-lg" : ""
            }`}
          >
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-400">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`${
                          compact ? "px-4 py-3" : "px-6 py-4"
                        } text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-300 last:border-r-0 ${
                          header.column.getCanSort()
                            ? "cursor-pointer hover:bg-gray-200 transition-colors select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-2">
                          <span>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </span>
                          {header.column.getCanSort() && (
                            <span className="text-gray-400">
                              {{
                                asc: (
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                  </svg>
                                ),
                                desc: (
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                                  </svg>
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick && onRowClick(row.original)}
                    className={`
                      ${
                        striped && rowIndex % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }
                      ${hoverable ? "hover:bg-blue-50 transition-colors" : ""}
                      ${onRowClick ? "cursor-pointer" : ""}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`${
                          compact ? "px-4 py-3" : "px-6 py-4"
                        } text-sm text-gray-700 border-r border-gray-200 last:border-r-0`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 bg-white px-6 py-3 rounded-lg shadow-sm">
            <span>
              Mostrando{" "}
              <span className="font-semibold text-gray-800">
                {table.getRowModel().rows.length}
              </span>{" "}
              {table.getRowModel().rows.length === 1 ? "registro" : "registros"}
            </span>
            {sorting.length > 0 && (
              <button
                onClick={() => setSorting([])}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpiar orden
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabla;

import ProductsTable from "../components/ProductTable";
import ProductFilter from "../components/filters/ProductFilters";
import type { ProductResponse } from "../../../models";
import { useListProducts } from "../hooks/useListProducts";
import { useState } from "react";
import EditProductModal from "../components/modals/EditProductModal";
import PaginationControl from "../components/PaginationControl";
import { Box } from "lucide-react";

export default function ProductsTablePage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const list = useListProducts(page, pageSize);
  const rows: ProductResponse[] = list.data?.items ?? [];

  const [nameSearch, setSearch] = useState("");
  const [quantitySearch, setQuantitySearch] = useState("");

  const filtrados = rows
    .filter(r => r.product_Name.toLowerCase().includes(nameSearch.toLowerCase()))
    .filter(r => r.quantity.toString().includes(quantitySearch))

  const totalPages = list.data?.total_Pages ?? 1;
  const totalRecords = list.data?.total_Records ?? 0;

  const [editRow, setEditRow] = useState<ProductResponse | null>(null);

  const handleEdit = (row: ProductResponse) => setEditRow(row);


  return (
    <div className="p-6">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Box className="w-7 h-7 text-cyan-400" />
            <h1 className="text-4xl font-black text-white">
              Gestión de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                Productos
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg">
            Administra, filtra y controla el listado de productos disponibles en la simulación.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 
                      border border-cyan-500/30 rounded-xl p-6 mb-10 
                      backdrop-blur-sm shadow-lg shadow-cyan-500/10">
          <ProductFilter onSearch={setSearch} onQuantitySearch={setQuantitySearch}
          />
        </div>

      </section>
      {list.isLoading ? (
        <div className="rounded-xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-12 text-center shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="text-cyan-300 mt-4 font-medium">Cargando tarjetas...</p>
        </div>
      ) : list.isError ? (
        <p className="text-red-600 mt-4 text-center">
          Error al cargar productos.
        </p>
      ) : (
        <ProductsTable rows={filtrados} onEdit={handleEdit} />
      )}
      <EditProductModal
        open={!!editRow}
        onClose={() => setEditRow(null)}
        product={editRow}
      />
      {totalPages >= 1 && (
        <PaginationControl
          page={page}
          total_Pages={totalPages}
          total_Records={totalRecords}
          page_Size={pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

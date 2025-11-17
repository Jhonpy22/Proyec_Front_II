import { useProducts } from "../hooks/useProducts";
import ProductsTable from "../components/ProductTable";

export default function ProductsTablePage() {
  const { data, isLoading, isError } = useProducts();

  // Si no hay data, usar []
  const rows = data ?? [];

  return (
    <div className="p-6">

      {isLoading ? (
        <p className="text-center text-[#03045E] mt-6 animate-pulse">
          Cargando productos…
        </p>
      ) : isError ? (
        <p className="text-red-600 mt-4 text-center">
          Error al cargar productos.
        </p>
      ) : (
        <ProductsTable rows={rows} />
      )}

    </div>
  );
}

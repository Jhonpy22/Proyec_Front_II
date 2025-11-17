import Tabla from "../components/tabla";
import { useGetCards } from "../hooks/useCards";

export default function CardsPage() {
  const { data: cards, isLoading, isError } = useGetCards();

  // Si no hay data, usar []
  const rows = cards ?? [];

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
        <Tabla rows={rows} />
      )}
    </div>
  );
}

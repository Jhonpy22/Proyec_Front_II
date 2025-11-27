import { useState } from "react";
import { useCardsList } from "../hooks/useCardsList";
import CardGrid from "../components/CardGrid";
import PaginationControl from "../components/PaginationControl";
import type { CardResponse } from "../../../models";
import CardFilterSimulator from "../components/filters/CardFilterSimulator";

export default function CardGridPage() {
    const [page, setPage] = useState(1);
    const pageSize = 9;

    const list = useCardsList(page, pageSize);
    const rows: CardResponse[] = list.data?.items ?? [];

    const [typeSearch, setTypeSearch] = useState("");

    const filtrados = rows
        .filter(r => r.card_Type.toLowerCase().includes(typeSearch.toLowerCase()))

    const totalPages = list.data?.total_Pages ?? 1;
    const totalRecords = list.data?.total_Records ?? 0;

    return (
        <div className="p-6">
            <div className="mb-4">
                <CardFilterSimulator onTypeSearch={setTypeSearch}/>
            </div>

            {list.isLoading ? (
                <div className="rounded-xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-12 text-center shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                    <p className="text-cyan-300 mt-4 font-medium">Cargando tarjetas...</p>
                </div>
            ) : list.isError ? (
                <p className="text-red-600 mt-4 text-center">Error al cargar.</p>
            ) : (
                <CardGrid rows={filtrados} />
            )}

            <PaginationControl
                page={page}
                total_Pages={totalPages}
                total_Records={totalRecords}
                page_Size={pageSize}
                onPageChange={setPage}
            />
        </div>
    );
}

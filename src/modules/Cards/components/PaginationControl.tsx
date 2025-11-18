interface PaginationControlsProps {
    page: number;
    total_Pages: number;
    total_Records: number;
    page_Size: number;
    onPageChange: (page: number) => void;
}

export default function PaginationControl({
    page,
    total_Pages,
    total_Records,
    page_Size,
    onPageChange,
}: PaginationControlsProps) {
    if (page > total_Pages && total_Pages > 0) {
        onPageChange(total_Pages);
    }
    
    const renderPageButtons = () => {
        if (total_Pages <= 7) {
            return [...Array(total_Pages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 font-semibold text-sm ${
                            page === pageNum 
                                ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/50" 
                                : "border-cyan-500/60 text-cyan-300 bg-slate-900/50 hover:bg-cyan-950/40 hover:border-cyan-400"
                        }`}
                    >
                        {pageNum}
                    </button>
                );
            });
        }

        const delta = 2; 
        const pages: (number | string)[] = [];

        for (let i = 1; i <= total_Pages; i++) {
            if (
                i === 1 || 
                i === total_Pages || 
                (i >= page - delta && i <= page + delta)
            ) {
                pages.push(i);
            }
        }

        const output: (number | string)[] = [];
        let prev = 0;
        for (const p of pages) {
            if (typeof p === "number" && prev && p - prev > 1) {
                output.push("...");
            }
            output.push(p);
            prev = typeof p === "number" ? p : prev;
        }

        return output.map((p, idx) =>
            p === "..." ? (
                <span key={idx} className="px-2 text-cyan-400">…</span>
            ) : (
                <button
                    key={p}
                    onClick={() => onPageChange(p as number)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 font-semibold text-sm ${
                        page === p 
                            ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/50" 
                            : "border-cyan-500/60 text-cyan-300 bg-slate-900/50 hover:bg-cyan-950/40 hover:border-cyan-400"
                    }`}
                >
                    {p}
                </button>
            )
        );
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                    onClick={() => onPageChange(Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-cyan-500/60 text-cyan-300 bg-slate-900/50 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm"
                >
                    Anterior
                </button>

                {renderPageButtons()}

                <button
                    onClick={() => onPageChange(Math.min(page + 1, total_Pages))}
                    disabled={page === total_Pages}
                    className="px-4 py-2 rounded-lg border border-cyan-500/60 text-cyan-300 bg-slate-900/50 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm"
                >
                    Siguiente 
                </button>
            </div>

            <p className="text-sm text-cyan-300 font-medium tracking-wide">
                {total_Records > 0 ? (
                    <>
                        Mostrando del {(page - 1) * page_Size + 1} al{" "}
                        {Math.min(page * page_Size, total_Records)} de {total_Records} resultados
                    </>
                ) : (
                    <>No se encontraron resultados</>
                )}
            </p>
        </div>
    );
}
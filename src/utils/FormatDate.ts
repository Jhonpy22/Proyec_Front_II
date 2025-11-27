
export function formatDate(dateString?: string | null): string {
    if (!dateString) return '—';
    try {

        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return 'Fecha inválida';
        // Formatear en español de Costa Rica
        return new Intl.DateTimeFormat('es-CR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: true, 
        }).format(date);
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Error en fecha';
    }
}

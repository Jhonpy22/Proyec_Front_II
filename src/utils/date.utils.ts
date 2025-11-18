/**
 * Convierte "DD/MM/YYYY" → "YYYY-MM-DD"
 */
export function convertCRToISO(dateStr: string): string {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

/**
 * Convierte "YYYY-MM-DDTHH:mm" → "YYYY-MM-DD"
 */
export function stripTimeFromDateTimeLocal(value: string): string {
  return value.split("T")[0];
}

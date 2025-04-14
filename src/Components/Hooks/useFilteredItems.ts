import { useMemo } from "react";

/**
 * Hook que filtra y ordena una lista de elementos por campo y término de búsqueda.
 * @param items Lista original de elementos.
 * @param searchField Campo por el cual se filtra (ej: 'businessName').
 * @param searchTerm Término de búsqueda.
 * @param sortField Campo por el cual se ordena.
 * @param sortDirection Dirección del ordenamiento: "asc" o "desc".
 */
export function useFilteredItems<T>(
  items: T[],
  searchField: keyof T,
  searchTerm: string,
  sortField?: keyof T,
  sortDirection: "asc" | "desc" = "asc"
): {
  filteredItems: T[];
  hasResults: boolean;
  emptyMessage: string;
} {
  const filteredItems = useMemo(() => {
    let results = [...items];

    // 1. Filtro por búsqueda
    if (searchTerm) {
      results = results.filter((item) =>
        String(item[searchField])?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Ordenamiento (opcional)
    if (sortField) {
      results.sort((a, b) => {
        const aVal = String(a[sortField] ?? "").toLowerCase();
        const bVal = String(b[sortField] ?? "").toLowerCase();

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return results;
  }, [items, searchField, searchTerm, sortField, sortDirection]);

  return {
    filteredItems,
    hasResults: filteredItems.length > 0,
    emptyMessage: `No hay coincidencias con la empresa que estás buscando.`,
  };
}

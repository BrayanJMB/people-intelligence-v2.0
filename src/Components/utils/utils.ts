// utils.ts
export const getValue = (empresa: any, field: string): string => {
    switch (field) {
      case "businessName": return empresa.businessName?.toLowerCase() || "";
      case "country": return empresa.country?.toLowerCase() || "";
      case "sedes": return empresa.address?.toLowerCase() || "";
      case "sizeCompany": return empresa.sizeCompany?.toLowerCase() || "";
      case "sector": return empresa.sector?.toLowerCase() || "";
      default: return "";
    }
  };
  
  export const sortItems = (items: any[], field: string, direction: string, getValue: Function) =>
    [...items].sort((a, b) => {
      const aVal = getValue(a, field);
      const bVal = getValue(b, field);
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  
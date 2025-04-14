import { CountryType } from "../types/country.types";
import { SectorType } from "../types/sector.types";
import { SizeCompanyType } from "../types/sizeCompany.types";
import { CompanyForm } from "../types/companyForm.types";

// Tipado del esquema del formulario
export type FormSchemaField =
  | {
      type: "input";
      label: string;
      name: keyof CompanyForm;
      placeholder?: string;
      required?: boolean;
      errorMessage?: string;
    }
  | {
      type: "select";
      label: string;
      name: keyof CompanyForm;
      options: { id: number; label: string }[]; // ← ¡SOLO number!
      required?: boolean;
      errorMessage?: string;
    };

// Función que genera el schema basado en los datos dinámicos
export const buildFormSchema = (
  countries: CountryType[],
  sizeCompanies: SizeCompanyType[],
  sectors: SectorType[]
): FormSchemaField[] => [
  {
    type: "input",
    label: "Nombre de empresa",
    name: "nombre",
    placeholder: "Ingresa el nombre de la empresa",
    required: true,
    errorMessage: "El nombre de la empresa es obligatorio",
  },
  {
    type: "select",
    label: "País",
    name: "pais",
    options: Array.isArray(countries)
      ? countries.map((c) => ({ id: Number(c.id), label: c.value }))
      : [],
    required: true,
    errorMessage: "Selecciona un país",
  },
  {
    type: "input",
    label: "Sedes",
    name: "sedes",
    placeholder: "Ingresa la sede",
    required: true,
    errorMessage: "La sede es obligatoria",
  },
  {
    type: "select",
    label: "Tamaño",
    name: "tamaño",
    options: Array.isArray(sizeCompanies)
      ? sizeCompanies.map((s) => ({
          id: Number(s.id),
          label: s.quantityEmployess,
        }))
      : [],
    required: true,
    errorMessage: "Selecciona un tamaño de empresa",
  },
  {
    type: "select",
    label: "Sector",
    name: "sector",
    options: Array.isArray(sectors)
      ? sectors.map((s) => ({ id: Number(s.id), label: s.sectorName }))
      : [],
    required: true,
    errorMessage: "Selecciona un sector",
  },
];

import { useEffect, useState } from "react";
import { AllCompanies } from "../services/getAllCompanies.service";
import { AllCountries } from "../services/country.service";
import { AllSectors } from "../services/getAllSector.service";
import { fetchAllSizeCompanies } from "../services/sizeCompany.services";
import { CompanyForm } from "../types/companyForm.types";
import { CountryType } from "../types/country.types";
import { SectorType } from "../types/sector.types";
import { SizeCompanyType } from "../types/sizeCompany.types";
import { buildFormSchema, FormSchemaField } from "../schemas/formCompany.schema";

export const useInformationLogic = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [sectors, setSectors] = useState<SectorType[]>([]);
  const [sizeCompanies, setSizeCompanies] = useState<SizeCompanyType[]>([]);

  const [data, setData] = useState<CompanyForm>({
    nombre: "",
    pais: "",
    sedes: "",
    tamaño: "",
    sector: "",
    img: null,
    activo: false,
    colorPrimario: "",
    colorSecundario: "",
    colorTerciario: "",
    HeaderColorTextos: "",
    HeaderColorIcons: "",
    navColorIcon: "",
    navColorFondoIcon: "",
    btnPrimarioColor: "",
    btnPrimarioColorTexto: "",
    btnSecundarioColor: "",
    btnSecundarioColorTexto: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const formSchema: FormSchemaField[] = buildFormSchema(countries, sizeCompanies, sectors);

  const validateFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    formSchema.forEach((field) => {
      const value = data[field.name];
      if (field.required && (!value || value === "")) {
        newErrors[field.name] = field.errorMessage || "Este campo es obligatorio";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAll = async () => {
    try {
      const [c1, c2, c3, c4] = await Promise.all([
        AllCompanies(),
        AllCountries(),
        AllSectors(),
        fetchAllSizeCompanies(),
      ]);
      setCompanies(c1);
      setCountries(c2);
      setSectors(c3);
      setSizeCompanies(c4);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    data,
    setData,
    companies,
    setCompanies,
    countries,
    sectors,
    sizeCompanies,
    formSchema,
    errors,
    setErrors,
    validateFields,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  };
};

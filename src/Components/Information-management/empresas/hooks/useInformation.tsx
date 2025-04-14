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
    // Estados
    const [companies, setCompanies] = useState<any[]>([]);
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [sectors, setSectors] = useState<SectorType[]>([]);
    const [sizeCompanies, setSizeCompanies] = useState<SizeCompanyType[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
  
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
  
    // Fetch individuales
    const fetchCompanies = async () => {
      const result = await AllCompanies();
      setCompanies(result);
    };
  
    const fetchCountries = async () => {
      const result = await AllCountries();
      setCountries(result);
    };
  
    const fetchSectors = async () => {
      const result = await AllSectors();
      setSectors(result);
    };
  
    const fetchSizes = async () => {
      const result = await fetchAllSizeCompanies();
      setSizeCompanies(result);
    };
  
    const fetchAll = async () => {
      try {
        await Promise.all([fetchCompanies(), fetchCountries(), fetchSectors(), fetchSizes()]);
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
      fetchCompanies, // ✅ expuesto al exterior
    };
  };
  
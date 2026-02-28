import React from "react";
import { CompanyForm } from "../types/companyForm.types";
import { CountryType } from "../types/country.types";
import { SectorType } from "../types/sector.types";
import { SizeCompanyType } from "../types/sizeCompany.types";
import { InputField } from "../../../shared/InputField";
import { SelectField } from "../../../shared/SelectField";
import { buildFormSchema } from "../schemas/formCompany.schema";
interface FormCompanyProps {
  data: CompanyForm;
  setData: React.Dispatch<React.SetStateAction<CompanyForm>>;
  countries: CountryType[];
  sizeCompanies: SizeCompanyType[];
  sectors: SectorType[];
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const FormCompany: React.FC<FormCompanyProps> = ({
  data,
  setData,
  countries,
  sizeCompanies,
  sectors,
  errors,
  setErrors,
}) => {
  const formSchema = buildFormSchema(countries, sizeCompanies, sectors);
  return (
    <>
      {formSchema.map((field) => {
        const commonProps = {
          key: field.name,
          label: field.label,
          name: field.name as keyof CompanyForm,
          value: String(data[field.name as keyof CompanyForm] ?? ""),
          onChange: (value: string) => {
            setData((prev) => ({ ...prev, [field.name]: value }));
            setErrors?.((prev) => {
              const updated = { ...prev };
              delete updated[field.name];
              return updated;
            });
          },
          error: errors?.[field.name],
        };

        if (field.type === "input") {
          return (
            <InputField
              {...commonProps}
              placeholder={field.placeholder || ""}
            />
          );
        }

        if (field.type === "select") {
          return <SelectField {...commonProps} options={field.options || []} />;
        }

        return null;
      })}

      <div className="col-span-2">
        <label htmlFor="img" className="text-[14px]">
          Imagen
        </label>

        {data.img ? (
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                typeof data.img === "string"
                  ? data.img
                  : URL.createObjectURL(data.img)
              }
              alt="Logo empresa"
              className="w-16 h-16 object-contain rounded border"
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="img"
                className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Cambiar imagen
              </label>
              <button
                type="button"
                onClick={() => setData((prev) => ({ ...prev, img: null }))}
                className="text-sm text-red-500 hover:text-red-700 text-left"
              >
                Quitar imagen
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="img"
            className="flex items-center justify-center w-full h-16 border-2 border-dashed rounded cursor-pointer text-sm text-gray-400 hover:text-gray-600 hover:border-gray-400 mb-2"
          >
            Seleccionar imagen
          </label>
        )}

        <input
          type="file"
          id="img"
          name="img"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({
              ...prev,
              img: e.target.files ? e.target.files[0] : null,
            }))
          }
        />
      </div>
    </>
  );
};

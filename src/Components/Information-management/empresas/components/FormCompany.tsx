import React from "react";
import { CompanyForm } from "../types/companyForm.types";
import { CountryType } from "../types/country.types";
import { SectorType } from "../types/sector.types";
import { SizeCompanyType } from "../types/sizeCompany.types";
import { InputField } from "./shared/InputField";
import { SelectField } from "./shared/SelectField";
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
        <input
          type="file"
          name="img"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({
              ...prev,
              img: e.target.files ? e.target.files[0] : null,
            }))
          }
          className="w-full p-2 border rounded mb-4"
        />
      </div>
    </>
  );
};

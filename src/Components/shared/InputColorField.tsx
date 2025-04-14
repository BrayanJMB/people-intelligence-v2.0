// components/shared/InputColorField.tsx
import { CompanyForm } from "../Information-management/empresas/types/companyForm.types";

interface InputColorFieldProps {
  label: string;
  name: keyof CompanyForm;
  value: string;
  onChange: (value: string) => void;
}

export const InputColorField = ({
  label,
  name,
  value,
  onChange,
}: InputColorFieldProps) => (
  <div className="col-span-1">
    <label htmlFor={name} className="text-[14px]">
      {label}
    </label>
    <div className="relative flex items-center justify-center">
      <label
        htmlFor={name}
        className={`absolute w-4/5 top-0 h-10 flex items-center justify-center right-0 cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
          value ? "flex" : "hidden"
        }`}
      >
        {value}
      </label>
      <input
        type="color"
        id={name}
        name={name}
        value={value || "#ffffff"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none h-11 border rounded btn-secundario !normal-case"
      />
    </div>
  </div>
);

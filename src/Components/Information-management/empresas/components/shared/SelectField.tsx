import { CompanyForm } from "../../types/companyForm.types";

export interface SelectFieldProps {
  label: string;
  name: keyof CompanyForm;
  value: string | number;
  onChange: (value: string) => void;
  options: { id: number; label: string }[]; // ✅ Asegúrate que aquí también sea SOLO `number`
  error?: string;
}

export const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
}: SelectFieldProps) => (
  <div className="col-span-1">
    <label htmlFor={name} className="text-[14px]">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded mb-1 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Seleccione una opción</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

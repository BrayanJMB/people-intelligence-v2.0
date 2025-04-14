import { CompanyForm } from "../../types/companyForm.types";

interface InputFieldProps {
  label: string;
  name: keyof CompanyForm;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}: InputFieldProps) => (
  <div className="col-span-1">
    <label htmlFor={name} className="text-[14px]">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-2 border rounded mb-1 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

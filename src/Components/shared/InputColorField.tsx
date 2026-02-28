import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { CompanyForm } from "../Information-management/empresas/types/companyForm.types";

interface InputColorFieldProps {
  label: string;
  name: keyof CompanyForm;
  value: string;
  onChange: (value: string) => void;
}

export const InputColorField = ({ label, name, value, onChange }: InputColorFieldProps) => {
  const [open, setOpen] = useState(false);
  const [inputHex, setInputHex] = useState(value || "#ffffff");
  const ref = useRef<HTMLDivElement>(null);

  // Sincroniza el input cuando cambia el valor externo
  useEffect(() => {
    setInputHex(value || "#ffffff");
  }, [value]);

  // Cierra al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputHex(val);
    // Solo propaga si es un hex válido (#fff o #ffffff)
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="col-span-1" ref={ref}>
      <label className="text-[14px]">{label}</label>

      {/* Trigger */}
      <div
        className="relative flex items-center border rounded h-11 cursor-pointer btn-secundario"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-10 h-full rounded-l border-r flex-shrink-0"
          style={{ backgroundColor: value || "#ffffff" }}
        />
        <span className="px-3 text-sm text-gray-600">{value || "#ffffff"}</span>
      </div>

      {/* Picker dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 shadow-xl rounded bg-white p-3 flex flex-col gap-2">
          <HexColorPicker color={value || "#ffffff"} onChange={(c) => { onChange(c); setInputHex(c); }} />
          
          {/* Input hex manual */}
          <div className="flex items-center gap-2 border rounded px-2 py-1">
            <div
              className="w-5 h-5 rounded-sm border flex-shrink-0"
              style={{ backgroundColor: inputHex }}
            />
            <input
              type="text"
              value={inputHex}
              onChange={handleHexInput}
              onClick={(e) => e.stopPropagation()}
              placeholder="#ffffff"
              maxLength={7}
              className="text-sm w-full outline-none font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
};
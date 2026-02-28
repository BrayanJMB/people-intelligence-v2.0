import { CompanyForm } from "../types/companyForm.types";
import { InputColorField } from "../../../shared/InputColorField";

interface FormCompanyColorProps {
  data: CompanyForm;
  setData: React.Dispatch<React.SetStateAction<CompanyForm>>;
}

type ColorFieldConfig = {
  label: string;
  name: keyof CompanyForm;
};

const temaFields: ColorFieldConfig[] = [
  { label: "Color Primario", name: "colorPrimario" },
  { label: "Color Secundario", name: "colorSecundario" },
  { label: "Color Terciario", name: "colorTerciario" },
];

const headerFields: ColorFieldConfig[] = [
  { label: "Color Textos", name: "HeaderColorTextos" },
  { label: "Color Icons", name: "HeaderColorIcons" },
];

const navFields: ColorFieldConfig[] = [
  { label: "Color Icono", name: "navColorIcon" },
  { label: "Fondo Icono", name: "navColorFondoIcon" },
];

const btnPrimarioFields: ColorFieldConfig[] = [
  { label: "Fondo Primario", name: "btnPrimarioColor" },
  { label: "Texto Primario", name: "btnPrimarioColorTexto" },
];

const btnSecundarioFields: ColorFieldConfig[] = [
  { label: "Fondo Secundario", name: "btnSecundarioColor" },
  { label: "Texto Secundario", name: "btnSecundarioColorTexto" },
];

export const FormCompanyColor: React.FC<FormCompanyColorProps> = ({ data, setData }) => {
  const renderFields = (fields: ColorFieldConfig[]) =>
    fields.map(({ label, name }) => (
      <InputColorField
        key={name}
        label={label}
        name={name}
        value={data[name] as string}
        onChange={(value) => setData((prev) => ({ ...prev, [name]: value }))}
      />
    ));

  return (
    <div className="grid grid-cols-4 gap-x-4">
      <input type="hidden" name="activo" value={String(data.activo)} />

      {/* Colores del tema */}
      <div className="col-span-4">
        <h2 className="font-bold my-3">Colores del tema</h2>
        <div className="grid grid-cols-3 gap-x-4">
          {renderFields(temaFields)}
        </div>
      </div>

      {/* Header y Barra lateral */}
      <div className="col-span-4 grid grid-cols-2 gap-x-4 my-3">
        <div>
          <h2 className="font-bold mb-2">Header</h2>
          <div className="grid grid-cols-2 gap-x-4">
            {renderFields(headerFields)}
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-2">Barra lateral</h2>
          <div className="grid grid-cols-2 gap-x-4">
            {renderFields(navFields)}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="col-span-4 grid grid-cols-2 gap-x-4 my-3">
        <div>
          <h2 className="font-bold mb-2">Botón primario</h2>
          <div className="grid grid-cols-2 gap-x-4">
            {renderFields(btnPrimarioFields)}
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-2">Botón secundario</h2>
          <div className="grid grid-cols-2 gap-x-4">
            {renderFields(btnSecundarioFields)}
          </div>
        </div>
      </div>
    </div>
  );
};
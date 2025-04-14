import { CompanyForm } from "../types/companyForm.types";
import { InputColorField } from "../../../shared/InputColorField";

interface FormCompanyColorProps {
  data: CompanyForm;
  setData: React.Dispatch<React.SetStateAction<CompanyForm>>;
}

export const FormCompanyColor: React.FC<FormCompanyColorProps> = ({
  data,
  setData,
}) => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <input type="hidden" name="activo" value={String(data.activo)} />

      <div className="col-span-4">
        <h2 className="font-bold my-3">Colores del tema</h2>
      </div>

      <div className="grid grid-cols-3 col-span-4 gap-x-4">
        <InputColorField
          label="Color Primario"
          name="colorPrimario"
          value={data.colorPrimario}
          onChange={(value) =>
            setData((prev) => ({ ...prev, colorPrimario: value }))
          }
        />
        <InputColorField
          label="Color Secundario"
          name="colorSecundario"
          value={data.colorSecundario}
          onChange={(value) =>
            setData((prev) => ({ ...prev, colorSecundario: value }))
          }
        />
        <InputColorField
          label="Color Terciario"
          name="colorTerciario"
          value={data.colorTerciario}
          onChange={(value) =>
            setData((prev) => ({ ...prev, colorTerciario: value }))
          }
        />
      </div>

      <div className="col-span-4 grid grid-cols-4 gap-x-4 my-3">
        <div className="col-span-2">
          <h2 className="font-bold">Header</h2>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Barra lateral</h2>
        </div>
      </div>

      <InputColorField
        label="Color Textos"
        name="HeaderColorTextos"
        value={data.HeaderColorTextos}
        onChange={(value) =>
          setData((prev) => ({ ...prev, HeaderColorTextos: value }))
        }
      />
      <InputColorField
        label="Color Icons"
        name="HeaderColorIcons"
        value={data.HeaderColorIcons}
        onChange={(value) =>
          setData((prev) => ({ ...prev, HeaderColorIcons: value }))
        }
      />
      <InputColorField
        label="Color Icono"
        name="navColorIcon"
        value={data.navColorIcon}
        onChange={(value) =>
          setData((prev) => ({ ...prev, navColorIcon: value }))
        }
      />
      <InputColorField
        label="Fondo Icono"
        name="navColorFondoIcon"
        value={data.navColorFondoIcon}
        onChange={(value) =>
          setData((prev) => ({ ...prev, navColorFondoIcon: value }))
        }
      />

      <div className="col-span-4 grid grid-cols-4 gap-x-4 my-3">
        <div className="col-span-2">
          <h2 className="font-bold">Botón primario</h2>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Botón secundario</h2>
        </div>
      </div>

      <InputColorField
        label="Fondo Primario"
        name="btnPrimarioColor"
        value={data.btnPrimarioColor}
        onChange={(value) =>
          setData((prev) => ({ ...prev, btnPrimarioColor: value }))
        }
      />
      <InputColorField
        label="Texto Primario"
        name="btnPrimarioColorTexto"
        value={data.btnPrimarioColorTexto}
        onChange={(value) =>
          setData((prev) => ({ ...prev, btnPrimarioColorTexto: value }))
        }
      />
      <InputColorField
        label="Fondo Secundario"
        name="btnSecundarioColor"
        value={data.btnSecundarioColor}
        onChange={(value) =>
          setData((prev) => ({ ...prev, btnSecundarioColor: value }))
        }
      />
      <InputColorField
        label="Texto Secundario"
        name="btnSecundarioColorTexto"
        value={data.btnSecundarioColorTexto}
        onChange={(value) =>
          setData((prev) => ({ ...prev, btnSecundarioColorTexto: value }))
        }
      />
    </div>
  );
};

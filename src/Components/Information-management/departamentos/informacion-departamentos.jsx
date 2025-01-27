import { useState } from "react";
import { Link } from "react-router-dom"; // Importación necesaria para el Link
import Departamentos from "./departamento";
import Oficinas from "./oficina";
import Cargos from "./cargo";
import { IconPlus } from "@tabler/icons-react"; // Importar el icono de creación

export default function InformationDepartamento() {
  const [activeTab, setActiveTab] = useState("departamentos");

  // editar
  const [openModal, setOpenModal] = useState(false);

  const modalProps = {
    openModal,
    setOpenModal,
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "departamentos":
        return <Departamentos {...modalProps} />;
      case "oficinas":
        return <Oficinas {...modalProps}/>;
      case "cargos":
        return <Cargos {...modalProps}/>;
      default:
        return <Departamentos {...modalProps}/>;
    }
  };

  return (
    <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
      <div className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px] flex-wrap">
        <h2 className="font-bold text-[22px]">Departamentos</h2>

        {/* Botón de crear */}
        <div className="w-6/12 flex justify-end">
          <button
            onClick={() => setOpenModal(!openModal)} // Cambia el estado de openModal
            className="btn btn-principal"
          >
            <IconPlus />
            <span>
              Crear{" "}
              {activeTab === "departamentos"
                ? "Departamento"
                : activeTab === "oficinas"
                ? "Oficina"
                : "Cargo"}
            </span>
          </button>
        </div>

        {/* Navegación de pestañas */}
        <nav className="flex gap-4 w-full pb-0 p-4 bg-gray-200 mt-4 justify-around">
          <button
            onClick={() => setActiveTab("departamentos")}
            className={`pb-3 px-4 rounded-none border-b-4 ${
              activeTab === "departamentos"
                ? "border-color-terciario"
                : "border-transparent"
            }`}
          >
            Departamentos
          </button>
          <button
            onClick={() => setActiveTab("oficinas")}
            className={`pb-3 px-4 rounded-none border-b-4 ${
              activeTab === "oficinas"
                ? "border-color-terciario"
                : "border-transparent"
            }`}
          >
            Oficinas
          </button>
          <button
            onClick={() => setActiveTab("cargos")}
            className={`pb-3 px-4 rounded-none border-b-4 ${
              activeTab === "cargos" ? "border-color-terciario" : "border-transparent"
            }`}
          >
            Cargos
          </button>
        </nav>
      </div>

      {/* Renderiza la pestaña activa */}
      <div className="my-6 bg-white p-8 rounded-[20px]">
        {renderActiveTab()}
      </div>
    </section>
  );
}

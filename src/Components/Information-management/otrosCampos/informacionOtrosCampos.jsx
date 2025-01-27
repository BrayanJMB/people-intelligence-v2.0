import { useState } from "react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import listIcon from "/assets/svg/list.svg";

export default function OtrosCampos() {
  const [camposCreados, setCamposCreados] = useState({
    "Tipo de documento": [
      "Cédula de ciudadanía",
      "Pasaporte",
      "Tarjeta de identidad",
    ],
    "Tipo de género": ["Masculino", "Femenino", "Otros"],
    Discapacidades: [
      "Auditiva",
      "Visual",
      "Física",
      "Intelectual",
      "Psicosocial",
      "Múltiple",
    ],
    "Tipo de salario": [
      "Mensual",
      "Quincenal",
      "Semanal",
      "Por hora",
      "Comisión",
      "Contrato temporal",
    ],
  });

  const [activeTab, setActiveTab] = useState(Object.keys(camposCreados)[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ type: "", value: "" });
  const [newDataValue, setNewDataValue] = useState("");
  const [newFieldName, setNewFieldName] = useState("");
  const itemsPerPage = 5;

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = camposCreados[activeTab]?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Número total de páginas
  const totalPages = Math.ceil(camposCreados[activeTab]?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalData({ type: "", value: "" });
    setNewDataValue("");
    setNewFieldName("");
  };

  const handleModalOpen = (action, value = "") => {
    if (action === "create") {
      setNewFieldName("");
    }
    setModalData({ type: action, value: value });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalData.type === "create") {
      // Creación de un campo
      setCamposCreados((prevState) => {
        const updatedCampos = {
          ...prevState,
          [modalData.value]: [],
        };
        setActiveTab(modalData.value);
        return updatedCampos;
      });
      console.log("Nuevo campo creado:", modalData.value);
    } else if (modalData.type === "edit") {        
      // Editar un dato existente
      const index = camposCreados[activeTab]?.indexOf(modalData.value);      
      if (index == -1) {
        camposCreados[activeTab][index] = modalData.value;
        console.log("dato editado:", modalData.value);
      }
    } else if (modalData.type === "edit-dato") {
      console.log(modalData);
      // Editar un dato existente
      const index = camposCreados[activeTab]?.indexOf(modalData.value);
      if (index == -1) {
        camposCreados[activeTab][index] = modalData.value;
        console.log("Campo editado:", modalData.value);
      }
    }
    handleModalClose();
  };

  const handleSaveNewData = () => {
    if (newDataValue.trim() !== "") {
      // Creación de un dato en el campo seleccionado
      setCamposCreados((prevState) => ({
        ...prevState,
        [activeTab]: [...prevState[activeTab], newDataValue],
      }));
      console.log("Nuevo dato creado en campo:", activeTab, newDataValue);
      setNewDataValue("");
      handleModalClose();
    }
  };

  return (
    <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
      <div className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px] flex-wrap">
        <h2 className="font-bold text-[22px]">Otros Campos</h2>

        {/* Botón de crear campo */}
        <button
          onClick={() => handleModalOpen("create")}
          className="btn btn-principal"
        >
          <IconPlus />
          <span>Crear Campo</span>
        </button>

        {/* Navegación de pestañas */}
        <nav className="flex gap-4 w-full pb-0 p-4 bg-gray-200 mt-4 justify-around">
          {Object.keys(camposCreados).map((data, key) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(data), setCurrentPage(1);
              }}
              className={`pb-3 px-4 rounded-none border-b-4 ${
                activeTab === data ? "border-color-terciario" : "border-transparent"
              }`}
            >
              {data}
            </button>
          ))}
        </nav>
      </div>

      {/* Renderiza la pestaña activa */}
      <div className="my-6 bg-white p-8 rounded-[20px] px-11 flex-wrap">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-[22px]">Listado</h2>
          <div className="flex gap-4">
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar campos" />
            </button>
            {/* Botón para crear datos del campo */}
            <button
              onClick={() => handleModalOpen("create-data")}
              className="btn btn-principal"
            >
              <IconPlus />
              <span>Crear Datos</span>
            </button>
          </div>
        </div>

        {/* Elementos de la lista */}
        <table className="w-full mt-5">
          <thead>
            <th className="text-start py-5 text-[#606060] font-normal flex items-center gap-2">
              {activeTab}
              {/* colocar el boton para editar los campos */}
              <IconPencil
                className="cursor-pointer hover:bg-[#f0f0f0] rounded-md transition-all p-[2px] w-7 h-7 border-[#dbdbdb] border"
                onClick={() => handleModalOpen("edit-dato", activeTab)}
              />
            </th>
            <th className="text-end py-5 text-[#606060] font-normal">
              Opciones
            </th>
          </thead>
          <tbody>
            {currentItems?.map((data, key) => (
              <tr key={key}>
                <td>{data}</td>
                <td className="py-5 px-4">
                  <span className="flex gap-1 justify-end">
                    <IconPencil
                      onClick={() => handleModalOpen("edit", data)}
                    />
                    <IconTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-3 py-1 mx-1 border ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 mx-1 border ${
                  currentPage === pageNumber ? "bg-gray-200" : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            className={`px-3 py-1 mx-1 border ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Modal de creación de datos */}
      {showModal && modalData.type === "create-data" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="font-bold text-[20px] mb-4">Crear Datos</h3>
            {/* <p className="mb-4 text-sm text-gray-600">
              Estás creando un dato para el campo: <strong>{activeTab}</strong>
            </p> */}
            <input
              type="text"
              value={newDataValue}
              onChange={(e) => setNewDataValue(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Ingresa el dato"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleModalClose} className="btn btn-secundario">
                Cancelar
              </button>
              <button onClick={handleSaveNewData} className="btn btn-principal">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de creación o edición de campo */}
      {showModal && modalData.type !== "create-data" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="font-bold text-[20px] mb-4">
              {modalData.type === "create" ? "Crear Campo" : "Editar Campo"}
            </h3>
            {/* <p className="mb-4 text-sm text-gray-600">
              Estás {modalData.type === "create" ? "creando" : "editando"} el
              campo: <strong>{activeTab}</strong>
            </p> */}
            <input
              type="text"
              value={modalData.value}
              onChange={(e) =>
                setModalData({ ...modalData, value: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Ingresa el valor"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleModalClose} className="btn btn-secundario">
                Cancelar
              </button>
              <button onClick={handleSave} className="btn btn-principal">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

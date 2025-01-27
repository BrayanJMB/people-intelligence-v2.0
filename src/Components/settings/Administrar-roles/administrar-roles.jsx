import listIcon from "/assets/svg/list.svg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
} from "@tabler/icons-react";
import { useState } from "react";

export default function ManageRol() {
  const reportes = [
    {
      id: 1,
      rol: "Administrador",
      descripcion: "Este rol es de prueba",
    },
    {
      id: 2,
      rol: "Administrador",
      descripcion: "Este rol es de prueba",
    },
    {
      id: 3,
      rol: "Administrador",
      descripcion: "Este rol es de prueba",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de reportes por página
  const [step, setStep] = useState(1);
  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportes.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(reportes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // modal reportes
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    rol: "",
    descripcion: "",
  });

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("rol", data.rol);
    formData.append("descripcion", data.descripcion);
    console.log("Crear:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      rol: "",
      descripcion: "",
    });
  };

  // editar categorias
  const handleEdit = (reportes) => {
    setStep(1);
    setEditing(reportes);
    setData({
      rol: reportes.rol,
      descripcion: reportes.descripcion,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      rol: "",
      descripcion: "",
    });
  };
  const handleCancel = () => {
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData({
      rol: "",
      descripcion: "",
    });
  };

  const handleDelete = (id) => {
    // funcion para eliminar por id
    console.log("producto eliminado " + id);
  };

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Roles</h2>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Crear Rol</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de roles</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar reportes" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Descripcion
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((reportes) => (
                  <tr key={reportes.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">{reportes.rol}</p>
                    </td>
                    <td className="py-5 px-4 flex gap-2 items-center">
                      {reportes.descripcion}
                    </td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconPencil onClick={() => handleEdit(reportes)} />
                        <IconTrash onClick={() => handleDelete(reportes.id)} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginador */}
          <div className="flex justify-center mt-4">
            <button
              className={`px-3 py-1 mx-1 border ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IconChevronLeft />
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
              <IconChevronRight />
            </button>
          </div>
        </section>
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex items-center mb-4 gap-4">
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar reportes" : "Crear reportes"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              {/* Select para Roles */}
              <div className="col-span-2">
                <label htmlFor="rol" className="text-[14px]">
                  Roles
                </label>
                <input
                  type="text"
                  name="rol"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el cargo"
                  value={data.rol}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, rol: e.target.value }))
                  }
                />
              </div>

              {/* Campo de descripción */}
              <div className="col-span-2">
                <label htmlFor="descripcion" className="text-[14px]">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={data.descripcion}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-4 resize-none"
                  rows="4"
                  placeholder="Escribe la descripción del rol"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="col-span-4 flex justify-end gap-4 mt-8">
              <button
                onClick={handleCancel}
                className="btn btn-secundario px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={editing ? handleUpdate : handleCreate}
                className="btn btn-principal px-4 py-2"
              >
                {editing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

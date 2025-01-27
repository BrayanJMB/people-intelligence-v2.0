import {
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import ImgConversacion from "/assets/img/conversacion.jpg";

export default function Departamentos({ openModal, setOpenModal }) {
  const departamentos = [
    {
      id: 1,
      area: "Talento humano",
      descripcion: "Lorem ipsum dolor sit amet, coctetuer adipiscing ",
    },
    {
      id: 2,
      area: "Administración",
      descripcion: "Lorem ipsum dolor sit amet, coctetuer adipiscing ",
    },
    {
      id: 3,
      area: "Talento humano",
      descripcion: "Lorem ipsum dolor sit amet, coctetuer adipiscing ",
    },
    {
      id: 4,
      area: "Administración",
      descripcion: "Lorem ipsum dolor sit amet, coctetuer adipiscing ",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departamentos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(departamentos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // modal crear y editar

  // modal departamentos
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    area: "",
    descripcion: "",
  });

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("area", data.area);
    formData.append("descripcion", data.descripcion);
    console.log("Creando departamentos:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      area: "",
      descripcion: "",
    });
  };

  // editar categorías
  const handleEdit = (departamento) => {
    setEditing(departamento);
    setData({
      area: departamento.area,
      descripcion: departamento.descripcion,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando mapa:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      area: "",
      descripcion: "",
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="py-5 px-4 text-left text-[#606060] font-normal">
                Área
              </th>
              <th className="py-5 px-4 text-left text-[#606060] font-normal">
                Descripción
              </th>
              <th className="py-5 px-4 text-left text-[#606060] font-normal">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((departamento) => (
              <tr key={departamento.id}>
                <td className="py-5 px-4">{departamento.area}</td>
                <td className="py-5 px-4">{departamento.descripcion}</td>
                <td className="py-5 px-4">
                  <span className="flex gap-1">
                    <IconPencil onClick={() => handleEdit(departamento)} />
                    <IconTrash />
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

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px] grid grid-cols-2 gap-x-4">
            <h3 className="text-[22px] font-bold mb-4 col-span-2">
              {editing ? "Editar área" : "Crear área"}
            </h3>

            {/* Área */}
            <div className="col-span-2">
              <label htmlFor="area" className="text-[14px]">
                Área
              </label>
              <input
                type="text"
                name="area"
                value={data.area}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, area: e.target.value }))
                }
                placeholder="Escribe aquí"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Descripción */}
            <div className="col-span-2">
              <label htmlFor="descripcion" className="text-[14px]">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={data.descripcion}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, descripcion: e.target.value }))
                }
                placeholder="Escribe una breve descripción"
                className="w-full p-2 border rounded mb-4 resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 col-span-2">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setEditing(null);
                  setData({ area: "", descripcion: "" });
                }}
                className="btn btn-secundario"
              >
                Cancelar
              </button>
              <button
                onClick={editing ? handleUpdate : handleCreate}
                className="btn btn-principal"
              >
                {editing ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

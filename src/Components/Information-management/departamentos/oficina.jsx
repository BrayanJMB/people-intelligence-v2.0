import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPencil, IconTrash } from "@tabler/icons-react";

export default function Oficinas({ openModal, setOpenModal }) {
  const oficinas = [
    { id: 1, sede: 'Bogotá' },
    { id: 2, sede: 'Medellín' },
    { id: 3, sede: 'Cali' },
    { id: 4, sede: 'Cartagena' },
    // Puedes añadir más oficinas aquí
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = oficinas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(oficinas.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modal de Crear/Editar
  const [editing, setEditing] = useState(null); // Para saber si estamos editando
  const [data, setData] = useState({ sede: "" }); // Datos del formulario

  const handleCreate = () => {
    // Crear oficina
    console.log("Creando oficina:", data);
    setOpenModal(false);
    setData({ sede: "" });
  };

  const handleEdit = (oficina) => {
    setEditing(oficina);
    setData({ sede: oficina.sede });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Actualizar oficina
    console.log("Actualizando oficina:", data);
    setOpenModal(false);
    setEditing(null);
    setData({ sede: "" });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="py-5 px-4 text-left text-[#606060] font-normal">Sede</th>
              <th className="py-5 px-4 text-[#606060] font-normal text-end">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((oficina) => (
              <tr key={oficina.id}>
                <td className="py-5 px-4">{oficina.sede}</td>
                <td className="py-5 px-4 flex justify-end">
                  <span className="flex gap-1">
                    <IconPencil onClick={() => handleEdit(oficina)} />
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
          className={`px-3 py-1 mx-1 border ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-1 mx-1 border ${currentPage === pageNumber ? "bg-gray-200" : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`px-3 py-1 mx-1 border ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IconChevronRight />
        </button>
      </div>

      {/* Modal para Crear/Editar */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px]">
            <h3 className="text-[22px] font-bold mb-4">
              {editing ? "Editar Oficina" : "Crear Oficina"}
            </h3>

            {/* Sede */}
            <div>
              <label htmlFor="sede" className="text-[14px]">
                Sede
              </label>
              <input
                type="text"
                name="sede"
                value={data.sede}
                onChange={(e) => setData({ sede: e.target.value })}
                placeholder="Escribe aquí"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setEditing(null);
                  setData({ sede: "" });
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

import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPencil, IconTrash } from "@tabler/icons-react";

export default function Cargos({openModal , setOpenModal}) {
  const cargos = [
    { id: 1, nombre: "Gerente General" },
    { id: 2, nombre: "Gerente de Ventas" },
    { id: 3, nombre: "Psicólogo" },
    { id: 4, nombre: "Contador" },
    // Puedes añadir más cargos aquí
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cargos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cargos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modal de Crear/Editar
  const [editing, setEditing] = useState(null); // Para saber si estamos editando
  const [data, setData] = useState({ nombre: "" }); // Datos del formulario

  const handleCreate = () => {
    // Crear cargo
    console.log("Creando cargo:", data);
    setOpenModal(false);
    setData({ nombre: "" });
  };

  const handleEdit = (cargo) => {
    setEditing(cargo);
    setData({ nombre: cargo.nombre });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Actualizar cargo
    console.log("Actualizando cargo:", data);
    setOpenModal(false);
    setEditing(null);
    setData({ nombre: "" });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="py-5 px-4 text-left text-[#606060] font-normal">Nombre de Cargo</th>
              <th className="py-5 px-4 text-[#606060] font-normal text-end">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cargo) => (
              <tr key={cargo.id}>
                <td className="py-5 px-4">{cargo.nombre}</td>
                <td className="py-5 px-4 flex justify-end">
                  <span className="flex gap-1">
                    <IconPencil onClick={() => handleEdit(cargo)} />
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
              {editing ? "Editar Cargo" : "Crear Cargo"}
            </h3>

            {/* Nombre del Cargo */}
            <div>
              <label htmlFor="nombre" className="text-[14px]">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={data.nombre}
                onChange={(e) => setData({ nombre: e.target.value })}
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
                  setData({ nombre: "" });
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

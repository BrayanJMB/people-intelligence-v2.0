import listIcon from "/assets/svg/list.svg";
import ImgConversacion from "/assets/img/conversacion.jpg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconUpload,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function InformationEmpleado() {
  const handleLinkClick = (title) => {
    titulo(title);
  };

  const empleados = [
    {
      id: 1,
      nombre: "Encuesta de inicio de actividades laborales #1",
      supervisor: "Carmen Gomez",
      fechaAdmision: "05/10/2024",
      cargo: "Psicologo",
      area: "Talento humano",
      img: ImgConversacion,
    },
    {
      id: 2,
      nombre: "Encuesta de fin de actividades laborales #2",
      supervisor: "Carmen Gomez",
      fechaAdmision: "05/10/2024",
      cargo: "Psicologo",
      area: "Talento humano",
      img: ImgConversacion,
    },
    {
      id: 3,
      nombre: "Encuesta de rendimiento laboral #3",
      supervisor: "Carmen Gomez",
      fechaAdmision: "05/10/2024",
      cargo: "Psicologo",
      area: "Talento humano",
      img: ImgConversacion,
    },
    {
      id: 4,
      nombre: "Encuesta de evaluación del equipo #4",
      supervisor: "Carmen Gomez",
      fechaAdmision: "05/10/2024",
      cargo: "Psicologo",
      area: "Talento humano",
      img: ImgConversacion,
    },
    {
      id: 5,
      nombre: "Encuesta de satisfacción #5",
      supervisor: "Carmen Gomez",
      fechaAdmision: "05/10/2024",
      cargo: "Psicologo",
      area: "Talento humano",
      img: ImgConversacion,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de empleados por página

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = empleados.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(empleados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // modal para crear y editar

  // modal empresas
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    supervisor: "",
    admision: "",
    cargo: "",
    area: "",
    img: null,
  });

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("supervisor", data.supervisor);
    formData.append("admision", data.admision);
    formData.append("cargo", data.cargo);
    formData.append("area", data.area);
    // Adjuntar imagen si está presente
    if (data.img) {
      formData.append("img", data.img);
    }
    console.log("Creando categoría:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      supervisor: "",
      admision: "",
      cargo: "",
      area: "",
      img: null,
    });
  };

  // editar categorías
  const handleEdit = (empresa) => {
    setEditing(empresa);
    setData({
      nombre: empresa.nombre,
      supervisor: empresa.supervisor,
      admision: empresa.admision,
      cargo: empresa.cargo,
      area: empresa.area,
      img: empresa.img,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando mapa:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      supervisor: "",
      admision: "",
      cargo: "",
      area: "",
      img: null,
    });
  };

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Empleados</h2>
            <p>(Empleados en vivo)</p>
          </div>
          <div className="flex gap-5">
            <button
              className="btn btn-secundario"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              <IconPlus />
              <span>Subir empleados</span>
            </button>
            {/* boton para añadir la lista de empleados */}
            <button
              className="btn btn-principal"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              <IconPlus />
              <span>Crear Empleado</span>
            </button>
          </div>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de empleados</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar empleados" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre de empleado
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Supervisor
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Fecha de admisión
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Cargo
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Área
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((empleado) => (
                  <tr key={empleado.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        <img
                          className="w-[30px] h-[30px] rounded-md"
                          src={empleado.img}
                          alt={`Imagen de ${empleado.nombre}`}
                        />
                        {empleado.nombre}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2">
                      {empleado.supervisor}
                    </td>
                    <td className="py-5 px-4">{empleado.fechaAdmision}</td>
                    <td className="py-5 px-4">{empleado.cargo}</td>
                    <td className="py-5 px-4">{empleado.area}</td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconPencil onClick={() => handleEdit(empleado)} />
                        <IconTrash />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* descargar svg boton */}
          <div className="flex justify-end">
            <button className="py-2 px-5 btn-principal">
              Descargar SVG de empleados
            </button>
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
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px] grid grid-cols-2 gap-x-4">
            <h3 className="text-[22px] font-bold mb-4 col-span-2">
              {editing ? "Editar empleado" : "Crear empleado"}
            </h3>

            {/* Nombre */}
            <div className="col-span-1">
              <label htmlFor="nombre" className="text-[14px]">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={data.nombre}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, nombre: e.target.value }))
                }
                placeholder="Escribe aquí"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Supervisor */}
            <div className="col-span-1">
              <label htmlFor="supervisor" className="text-[14px]">
                Nombre del supervisor
              </label>
              <input
                type="text"
                name="supervisor"
                value={data.supervisor}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, supervisor: e.target.value }))
                }
                placeholder="Escribe aquí"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Admisión */}
            <div className="col-span-1">
              <label htmlFor="admision" className="text-[14px]">
                Fecha de admisión
              </label>
              <input
                type="date"
                name="admision"
                value={data.admision}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, admision: e.target.value }))
                }
                placeholder="Fecha de admisión"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Cargo */}
            <div className="col-span-1">
              <label htmlFor="cargo" className="text-[14px]">
                Cargo
              </label>
              <input
                type="text"
                name="cargo"
                value={data.cargo}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, cargo: e.target.value }))
                }
                placeholder="Escribe aquí"
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            {/* Área */}
            <div className="col-span-1">
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

            {/* Imagen */}
            <div className="col-span-1">
              <label htmlFor="img" className="text-[14px]">
                Imagen del empleado
              </label>
              <input
                id="img"
                type="file"
                name="img"
                accept="image/*"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, img: e.target.files[0] }))
                }
                className="w-full p-2 border rounded mb-4"
              />
            </div>

            <div className="flex justify-end gap-4 col-span-2">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setEditing(null);
                  setData({
                    nombre: "",
                    supervisor: "",
                    admision: "",
                    cargo: "",
                    area: "",
                    img: null,
                  });
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

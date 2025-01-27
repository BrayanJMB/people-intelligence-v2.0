import listIcon from "../../../assets/svg/list.svg";
import ImgConversacion from "../../../assets/img/conversacion.jpg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
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

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Empleados</h2>
            <p>(Empleados en vivo)</p>
          </div>
          <Link to={"/"} onClick={() => handleLinkClick("Crear Empleado")}>
            <button className="w-max text-center flex justify-center items-center gap-3 p-2 px-4 text-white bg-[#1D70B7]">
              <IconPlus />
              <span>Crear Empleado</span>
            </button>
          </Link>
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
                        <IconPencil />
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
            <button className="bg-[#1D70B7] py-2 px-5 text-white">Descargar SVG de empleados</button>
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
    </>
  );
}

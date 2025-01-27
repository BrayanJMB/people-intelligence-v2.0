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

export default function InformationDepartamento() {
  const handleLinkClick = (title) => {
    titulo(title);
  };

  const departamentos = [
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
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de departamentos por página

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departamentos.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(departamentos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Departamentos</h2>
            <p>(Departamentos en vivo)</p>
          </div>
          <Link to={"/"} onClick={() => handleLinkClick("Crear Departamento")}>
            <button className="w-max text-center flex justify-center items-center gap-3 p-2 px-4 text-white bg-[#1D70B7]">
              <IconPlus />
              <span>Crear Departamento</span>
            </button>
          </Link>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de departamentos</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar departamentos" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre de departamento
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
                {currentItems.map((departamento) => (
                  <tr key={departamento.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        <img
                          className="w-[30px] h-[30px] rounded-md"
                          src={departamento.img}
                          alt={`Imagen de ${departamento.nombre}`}
                        />
                        {departamento.nombre}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2">
                      {departamento.supervisor}
                    </td>
                    <td className="py-5 px-4">{departamento.fechaAdmision}</td>
                    <td className="py-5 px-4">{departamento.cargo}</td>
                    <td className="py-5 px-4">{departamento.area}</td>
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

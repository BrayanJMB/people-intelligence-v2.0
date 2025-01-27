import listIcon from "../../assets/svg/list.svg";
import ImgConversacion from "../../assets/img/conversacion.jpg";
import {
  IconTrash,
  IconDownload,
  IconLink,
  IconEye,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LiveConversations({ titulo }) {
  const handleLinkClick = (title) => {
    titulo(title);
  };

  const encuestas = [
    {
      id: 1,
      nombre: "Encuesta de inicio de actividades laborales #1",
      moderador: "Carlos Gomez Perez",
      img: ImgConversacion,
    },
    {
      id: 2,
      nombre: "Encuesta de fin de actividades laborales #2",
      moderador: "Laura Martinez",
      img: ImgConversacion,
    },
    {
      id: 3,
      nombre: "Encuesta de rendimiento laboral #3",
      moderador: "David Garcia",
      img: ImgConversacion,
    },
    {
      id: 4,
      nombre: "Encuesta de evaluación del equipo #4",
      moderador: "Ana Rodriguez",
      img: ImgConversacion,
    },
    {
      id: 5,
      nombre: "Encuesta de satisfacción #5",
      moderador: "María Fernanda",
      img: ImgConversacion,
    },
    {
      id: 6,
      nombre: "Encuesta de motivación laboral #6",
      moderador: "Jose Ramirez",
      img: ImgConversacion,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = encuestas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(encuestas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
      <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
        <div>
          <h2 className="font-bold text-[22px]">Dynamic Live Conversations</h2>
          <p>(Conversaciones dinámicas en vivo)</p>
        </div>
        <Link
          to={"/crear-conversacion"}
          onClick={() => handleLinkClick("Crear conversación")}
        >
          <button className="w-max text-center flex justify-center items-center gap-3 p-2 px-4 text-white bg-[#1D70B7]">
            <IconPlus />
            <span>Crear conversación</span>
          </button>
        </Link>
      </section>

      <section className="my-6 bg-white p-8 rounded-[20px]">
        <div className="flex justify-between items-center px-4">
          <h2>Listado de encuestas</h2>
          <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
            <span className="font-[400]">Ordenar</span>
            <img className="" src={listIcon} alt="Ordenar encuestas" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="py-5 px-4 text-left text-[#606060] font-normal">
                  Nombre de encuesta
                </th>
                <th className="py-5 px-4 text-left text-[#606060] font-normal">
                  Nombre de moderador
                </th>
                <th className="py-5 px-4 text-left text-[#606060] font-normal">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((encuesta) => (
                <tr key={encuesta.id}>
                  <td className="py-5 px-4">
                    <p className="flex items-center gap-4">
                      <img
                        className="w-[30px] h-[30px] rounded-md"
                        src={encuesta.img}
                        alt={`Imagen de ${encuesta.nombre}`}
                      />
                      {encuesta.nombre}
                    </p>
                  </td>
                  <td className="py-5 px-4 flex gap-2">
                    {encuesta.moderador}
                  </td>
                  <td className="py-5 px-4">
                    <span className="flex gap-1">
                      <IconEye />
                      <IconDownload />
                      <IconLink />
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
  );
}

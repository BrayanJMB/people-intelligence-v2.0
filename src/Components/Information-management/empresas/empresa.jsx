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

export default function InformationEmpresas() {
  const handleLinkClick = (title) => {
    titulo(title);
  };

  const empresas = [
    {
      id: 1,
      nombre: "Encuesta de inicio de actividades laborales #1",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 2,
      nombre: "Encuesta de fin de actividades laborales #2",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: true,
    },
    {
      id: 3,
      nombre: "Encuesta de rendimiento laboral #3",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: true,
    },
    {
      id: 4,
      nombre: "Encuesta de evaluación del equipo #4",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 5,
      nombre: "Encuesta de satisfacción #5",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 6,
      nombre: "Encuesta de evaluación del equipo #4",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 7,
      nombre: "Encuesta de satisfacción #5",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 8,
      nombre: "Encuesta de evaluación del equipo #4",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 9,
      nombre: "Encuesta de satisfacción #5",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de empresas por página

  // Estado de los switches
  const [switchStates, setSwitchStates] = useState(
    empresas.reduce(
      (acc, empresa) => ({ ...acc, [empresa.id]: empresa.activo }),
      {}
    )
  );

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = empresas.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(empresas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejador de cambios para el switch
  const handleSwitchChange = (id) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Empresas</h2>
            <p>(Empresas en vivo)</p>
          </div>
          <Link to={"/"} onClick={() => handleLinkClick("Crear Empresa")}>
            <button className="w-max text-center flex justify-center items-center gap-3 p-2 px-4 text-white bg-[#1D70B7]">
              <IconPlus />
              <span>Crear Empresa</span>
            </button>
          </Link>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de empresas</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar empresas" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre de empresa
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Pais
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Sedes
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Tamaño de la empresa
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Sector
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Opciones
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((empresa) => (
                  <tr key={empresa.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        <img
                          className="w-[30px] h-[30px] rounded-md"
                          src={empresa.img}
                          alt={`Imagen de ${empresa.nombre}`}
                        />
                        {empresa.nombre}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2">{empresa.pais}</td>
                    <td className="py-5 px-4">{empresa.sedes}</td>
                    <td className="py-5 px-4">{empresa.tamaño}</td>
                    <td className="py-5 px-4">{empresa.sector}</td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconPencil/>
                        <IconTrash />
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={switchStates[empresa.id]}
                          onChange={() => handleSwitchChange(empresa.id)}
                        />
                        <div
                          className={`w-11 h-6 bg-gray-200 rounded-full transition duration-200 ${
                            switchStates[empresa.id] ? "bg-blue-600" : ""
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                            switchStates[empresa.id] ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
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

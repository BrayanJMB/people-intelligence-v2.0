import listIcon from "/assets/svg/list.svg";
import ImgConversacion from "/assets/img/conversacion.jpg";

import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconEye,
} from "@tabler/icons-react";
import { useState } from "react";

export default function RegistroDashboard() {
  const dashboards = [
    {
      id: 1,
      nombre: "Dashboard de capacitaciones para empresas",
      grupo: "3d3d3",
      nombreCompany: "davivienda",
      imgCompany: "/assets/img/davivienda-icon.jpg",
      nombreReporte: "Dashboard",
      description: "Descripción de ejemplo",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 2,
      nombre: "Dashboard de capacitaciones para empresas",
      grupo: "3d3d3",
      nombreCompany: "davivienda",
      imgCompany: "/assets/img/davivienda-icon.jpg",
      nombreReporte: "Dashboard",
      description: "Descripción de ejemplo",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 3,
      nombre: "Dashboard de capacitaciones para empresas",
      grupo: "3d3d3",
      nombreCompany: "davivienda",
      imgCompany: "/assets/img/davivienda-icon.jpg",
      nombreReporte: "Dashboard",
      description: "Descripción de ejemplo",
      img: ImgConversacion,
      activo: false,
    },
  ];

  const Empresas = [
    {
      nombreCompany: "davivienda",
    },
    {
      nombreCompany: "bancolombia",
    },
    {
      nombreCompany: "allianz",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de dashboards por página
  const [step, setStep] = useState(1);
  // Estado de los switches
  const [switchStates, setSwitchStates] = useState(
    dashboards.reduce(
      (acc, dashboard) => ({ ...acc, [dashboard.id]: dashboard.activo }),
      {}
    )
  );

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dashboards.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(dashboards.length / itemsPerPage);

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

  // modal dashboards
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    grupo: "",
    nombreCompany: "",
    nombreReporte: "",
    description: "",
    activo: false,
  });

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    console.log("Crear:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      grupo: "",
      nombreCompany: "",
      nombreReporte: "",
      description: "",
      activo: false,
    });
  };

  // editar categorias
  const handleEdit = (dashboard) => {
    setStep(1);
    setEditing(dashboard);
    setData({
      nombre: dashboard.nombre,
      grupo: dashboard.grupo,
      nombreCompany: dashboard.nombreCompany,
      nombreReporte: dashboard.nombreReporte,
      description: dashboard.description,
      activo: dashboard.activo,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando data:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      grupo: "",
      nombreCompany: "",
      nombreReporte: "",
      description: "",
      activo: false,
    });
  };
  const handleCancel = () => {
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      grupo: "",
      nombreCompany: "",
      nombreReporte: "",
      description: "",
      activo: false,
    });
  };

  const handleDelete = (id) =>{
    // funcion para eliminar por id

    console.log('producto eliminado ' + id);
    
  }

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Dashboard</h2>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Crear Dashboard</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de dashboard</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar dashboards" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Titulo dashboard
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre de compañía
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Estado
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((dashboard) => (
                  <tr key={dashboard.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        <img
                          className="w-[30px] h-[30px] rounded-md"
                          src={dashboard.img}
                          alt={`Imagen de ${dashboard.nombre}`}
                        />
                        {dashboard.nombre}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2 items-center">
                      <div className="img-contain bg-[#ECEEF6] p-1 rounded">
                        <img
                          src={dashboard.imgCompany}
                          className=""
                          width={25}
                          height={25}
                          alt=""
                        />
                      </div>
                      {dashboard.nombreCompany}
                    </td>
                    <td className="py-5 px-4">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={switchStates[dashboard.id]}
                          onChange={() => handleSwitchChange(dashboard.id)}
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition duration-200 ${
                            switchStates[dashboard.id]
                              ? "!bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                            switchStates[dashboard.id] ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
                    </td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconEye />
                        <IconPencil onClick={() => handleEdit(dashboard)} />
                        <IconTrash onClick={() => handleDelete(dashboard.id)} />
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
                {editing ? "Editar dashboard" : "Crear dashboard"}
              </h3>
            </div>

            {/* Control de pasos */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-1">
                <label htmlFor="nombre" className="text-[14px]">
                  Nombre de compañía
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

              <div className="col-span-1">
                <label htmlFor="grupo" className="text-[14px]">
                  Grupo ID
                </label>
                <input
                  type="text"
                  name="grupo"
                  value={data.grupo}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, grupo: e.target.value }))
                  }
                  placeholder="Escribe aquí"
                  className="w-full p-2 border rounded mb-4"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="nombreCompany" className="text-[14px]">
                  Nombre compañía
                </label>
                <select
                  name="nombreCompany"
                  value={data.nombreCompany}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      nombreCompany: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="" disabled>
                    Seleccione una compañía
                  </option>
                  {Empresas.map((empresa, index) => (
                    <option key={index} value={empresa.nombreCompany}>
                      {empresa.nombreCompany}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor="nombreReporte" className="text-[14px]">
                  Nombre de reporte
                </label>
                <input
                  type="text"
                  name="nombreReporte"
                  value={data.nombreReporte}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      nombreReporte: e.target.value,
                    }))
                  }
                  placeholder="Escribe aquí"
                  className="w-full p-2 border rounded mb-4"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="text-[14px]">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Escribe aquí..."
                  className="w-full p-2 border rounded mb-4 resize-none"
                  rows="4"
                />
              </div>
            </div>
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

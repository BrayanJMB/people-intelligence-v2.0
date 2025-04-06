import listIcon from "/assets/svg/list.svg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import {
  AllCompaniesRoles,
  AllCompaniesRolesUnassigned,
} from "./services/compayRoles.service";

export default function Managecompany() {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [companiesWithRoles, setCompaniesWithRoles] = useState("");
  const [roles, setRoles] = useState([]); // roles filtrados
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  // modal reportes
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    rol: "",
  });

  const [step, setStep] = useState(1);
  const itemsPerPage = 6; // Número de reportes por página
  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    companiesWithRoles &&
    companiesWithRoles.slice(indexOfFirstItem, indexOfLastItem);
  // Número total de páginas
  const totalPages = Math.ceil(companiesWithRoles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = () => {
    const formData = new FormData();
    console.log(data)
    formData.append("name", data.name);
    formData.append("rol", data.rol);
    console.log("Crear:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      rol: "",
    });
  };

  // editar categorias
  const handleEdit = (reportes) => {
    setStep(1);
    setEditing(reportes);
    setData({
      nombre: reportes.nombre,
      rol: reportes.rol,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      rol: "",
    });
  };
  const handleCancel = () => {
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      rol: "",
    });
  };

  const handleDelete = (id) => {
    // funcion para eliminar por id
    console.log("producto eliminado " + id);
  };

  const Empresas = [
    {
      nombreCompany: "Davivienda",
    },
    {
      nombreCompany: "Bancolombia",
    },
    {
      nombreCompany: "Allianz",
    },
  ];

  const roles2 = [
    {
      rol: "Administrador",
    },
    {
      rol: "Usuario",
    },
    {
      rol: "Invitado",
    },
  ];

  const handleCompanyChange = async (e) => {
    const companyId = e.target.value;
    setSelectedCompanyId(companyId);
    console.log(companyId);
    if (companyId) {
      try {
        AllCompaniesRolesUnassigned;
        const res = await AllCompaniesRolesUnassigned(companyId);
        setRoles(res);
        console.log(res);
      } catch (err) {
        console.error("Error cargando roles", err);
      }
    } else {
      setRoles([]); // reset si no hay compañía
    }
  };

  useEffect(() => {
    // Llamar al endpoint al cargar
    const fetchData = async () => {
      try {
        const response = await AllCompaniesRoles(); // ← Cambia por tu endpoint real
        // Transformamos para tener una fila por cada rol
        console.log(response);
        const items = response.flatMap((company) => {
          // Si no tiene roles o roles vacíos, retornamos una fila con "sin roles"
          if (!company.roles || company.roles.length === 0) {
            return [
              {
                id: null,
                nombre: company.companyName,
                rol: "Sin roles asignados",
                imgCompany: company.logo,
                companyId: company.companyId,
              },
            ];
          }

          // Si tiene roles, mapeamos normalmente
          return company.roles.map((role) => ({
            id: role.id,
            nombre: company.companyName,
            rol: role.name,
            imgCompany: company.logo,
            companyId: company.companyId,
          }));
        });

        console.log(items);
        setCompaniesWithRoles(items);
      } catch (error) {
        console.error("Error al cargar compañías:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Roles de la compañia</h2>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Asignar Rol</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de reportes</h2>
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
                    Nombre de compañía
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Roles
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((reportes) => (
                    <tr key={reportes.id}>
                      <td className="py-5 px-4">
                        <p className="flex items-center gap-4">
                          <div className="img-contain bg-[#ECEEF6] p-1 rounded">
                            <img
                              src={reportes.imgCompany}
                              className=""
                              width={25}
                              height={25}
                              alt=""
                            />
                          </div>
                          {reportes.nombre}
                        </p>
                      </td>
                      <td className="py-5 px-4 flex gap-2 items-center">
                        {reportes.rol}
                      </td>
                      <td className="py-5 px-4">
                        <span className="flex gap-1">
                          {/*<IconPencil onClick={() => handleEdit(reportes)} />*/}
                          <IconTrash
                            onClick={() => handleDelete(reportes.id)}
                          />
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
                {editing ? "Editar rol" : "Crear rol"}
              </h3>
            </div>

            {/* Control de pasos */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <label htmlFor="nombre" className="text-[14px]">
                  Compañía
                </label>
                <select
                  name="nombre"
                  value={data.nombre}
                  onChange={(e) => {
                    const companyId = e.target.value;

                    // 1. Actualizar el estado de datos externos (como el nombre, por ejemplo)
                    setData((prev) => ({ ...prev, nombre: companyId }));

                    // 2. Llamar a handleCompanyChange para cargar los roles
                    handleCompanyChange(e);
                  }}
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Selecciona una compañía</option>
                  {currentItems &&
                    currentItems.map((empresa, index) => (
                      <option key={index} value={empresa.companyId}>
                        {empresa.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="rol" className="text-[14px]">
                  Roles
                </label>
                <select
                  name="rol"
                  value={data.rol}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, rol: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-4"
                  disabled={!data.nombre || roles.length === 0}
                >
                  <option value="">
                    {!data.nombre
                      ? "Por favor selecciona una compañía"
                      : roles.length === 0
                      ? "Esta compañía ya tiene todos los roles"
                      : "Selecciona un rol disponible"}
                  </option>

                  {roles.length > 0 &&
                    roles.map((role, index) => (
                      <option key={index} value={role.rol}>
                        {role.name}
                      </option>
                    ))}
                </select>
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

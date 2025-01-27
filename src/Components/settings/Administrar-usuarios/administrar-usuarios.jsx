import listIcon from "/assets/svg/list.svg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
} from "@tabler/icons-react";
import { useState } from "react";

export default function ManageUsers() {
  const reportes = [
    {
      id: 1,
      nombre: "Luis Gonzalez Yepez",
      correo: "Luis_gonzalez_y@gmail.com",
      rol: "Administrador",
      tipoDocumento: "cc",
      numeroDocumento: "10032432",
      telefono: "311665432",
      cargo: "gerente",
    },
    {
      id: 2,
      nombre: "Luis Gonzalez Yepez",
      correo: "Luis_gonzalez_y@gmail.com",
      rol: "Administrador",
      tipoDocumento: "cc",
      numeroDocumento: "10032432",
      telefono: "311665432",
      cargo: "gerente",
    },
    {
      id: 3,
      nombre: "Luis Gonzalez Yepez",
      correo: "Luis_gonzalez_y@gmail.com",
      rol: "Administrador",
      tipoDocumento: "cc",
      numeroDocumento: "10032432",
      telefono: "311665432",
      cargo: "gerente",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de reportes por página
  const [step, setStep] = useState(1);
  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportes.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(reportes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // modal reportes
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    correo: "",
    rol: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    cargo: "",
  });

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("correo", data.correo);
    formData.append("rol", data.rol);
    formData.append("tipoDocumento", data.tipoDocumento);
    formData.append("numeroDocumento", data.numeroDocumento);
    formData.append("telefono", data.telefono);
    formData.append("cargo", data.cargo);

    console.log("Crear:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      correo: "",
      rol: "",
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      cargo: "",
    });
  };

  // editar categorias
  const handleEdit = (reportes) => {
    setStep(1);
    setEditing(reportes);
    setData({
      nombre: reportes.nombre || "",
      correo: reportes.correo || "",
      rol: reportes.rol || "",
      tipoDocumento: reportes.tipoDocumento || "",
      numeroDocumento: reportes.numeroDocumento || "",
      telefono: reportes.telefono || "",
      cargo: reportes.cargo || "",
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
      correo: "",
      rol: "",
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      cargo: "",
    });
  };
  const handleCancel = () => {
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      correo: "",
      rol: "",
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      cargo: "",
    });
  };

  const handleDelete = (id) => {
    // funcion para eliminar por id
    console.log("producto eliminado " + id);
  };

  const Documento = [
    {
      tipoDocumento: "CC",
    },
    {
      tipoDocumento: "TI",
    },
    {
      tipoDocumento: "Pasaporte",
    },
  ];

  const roles = [
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

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Administrador de Usuario</h2>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Nuevo usuario</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de usuarios</h2>
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
                    Nombre de completo
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Correo electrónico
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
                {currentItems.map((reportes) => (
                  <tr key={reportes.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        {reportes.nombre}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2 items-center">
                      {reportes.correo}
                    </td>
                    <td className="py-5 px-4">{reportes.rol}</td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconPencil onClick={() => handleEdit(reportes)} />
                        <IconTrash onClick={() => handleDelete(reportes.id)} />
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
                {editing ? "Editar Usuario" : "Crear Usuario"}
              </h3>
            </div>

            {/* Control de formulario */}
            <div className="grid grid-cols-2 gap-x-4">
              {/* Nombre */}
              <div className="col-span-1">
                <label htmlFor="nombre" className="text-[14px]">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={data.nombre}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el nombre"
                />
              </div>

              {/* Correo */}
              <div className="col-span-1">
                <label htmlFor="correo" className="text-[14px]">
                  Correo
                </label>
                <input
                  type="email"
                  name="correo"
                  value={data.correo}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, correo: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el correo"
                />
              </div>

              {/* Tipo de documento */}
              <div className="col-span-1">
                <label htmlFor="tipoDocumento" className="text-[14px]">
                  Tipo de Documento
                </label>
                <select
                  name="tipoDocumento"
                  value={data.tipoDocumento}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      tipoDocumento: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Selecciona un tipo de documento</option>
                  {Documento.map((doc, index) => (
                    <option key={index} value={doc.tipoDocumento}>
                      {doc.tipoDocumento}
                    </option>
                  ))}
                </select>
              </div>

              {/* Número de documento */}
              <div className="col-span-1">
                <label htmlFor="numeroDocumento" className="text-[14px]">
                  Número de Documento
                </label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={data.numeroDocumento}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      numeroDocumento: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el número de documento"
                />
              </div>

              {/* Teléfono */}
              <div className="col-span-1">
                <label htmlFor="telefono" className="text-[14px]">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={data.telefono}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, telefono: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el teléfono"
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
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Ingresa el cargo"
                />
              </div>

              {/* Roles */}
              <div className="col-span-1">
                <label htmlFor="rol" className="text-[14px]">
                  Rol
                </label>
                <select
                  name="rol"
                  value={data.rol}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, rol: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role.rol}>
                      {role.rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botones */}
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

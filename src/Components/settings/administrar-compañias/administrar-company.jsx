import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  AllCompaniesRoles,
  AllCompaniesRolesUnassigned,
  createCompanyRol,
} from "./services/compayRoles.service";
import { PaginatorTable } from "../../Paginator/PaginatorTable";
import { SelectField } from "../../shared/SelectField";
import { StepNavigationButtons } from "../../shared/StepNavigationButtons";
import { useFilteredItems } from "../../Hooks/useFilteredItems";
import { informationCompanyRole } from "./schemas/informationCompanyRol.schema";
import { getValue,sortItems } from "../../utils/utils";
import { TableWithSortAndSearch } from "../../shared/TableWithSortAndSearch";
export default function Managecompany() {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [companiesWithRoles, setCompaniesWithRoles] = useState([]);
  const [roles, setRoles] = useState([]); // roles filtrados
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const { filteredItems } = useFilteredItems(
    companiesWithRoles,
    "nombre",
    searchTerm,
    sortField,
    sortDirection
  );
  // Paginación después del filtrado y ordenado
  const itemsPerPage = 6; // Número de reportes por página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  // modal reportes
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    rol: "",
  });


  // Número total de páginas
  const totalPages = Math.ceil(companiesWithRoles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = () => {
    createCompanyRol({ id: data.nombre, roleId: data.rol });
    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      rol: "",
    });
  };

  // editar categorias
  const handleEdit = (reportes) => {
    setEditing(reportes);
    setData({
      nombre: reportes.nombre,
      rol: reportes.rol,
    });
    setOpenModal(true);
  };

  const handleSort = useCallback((field) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
        return prev;
      } else {
        setSortDirection("asc");
        return field;
      }
    });
  }, []);

  const sortedCurrentItems = useMemo(() => {
    return sortItems(currentItems, sortField, sortDirection, getValue);
  }, [currentItems, sortField, sortDirection]);


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
        const items = response.flatMap((company) => {
          // Si no tiene roles o roles vacíos, retornamos una fila con "sin roles"
          if (!company.roles || company.roles.length === 0) {
            return [
              {
                id: null,
                nombre: company.companyName,
                rol: "Sin roles asignados",
                logo: company.logo,
                companyId: company.companyId,
              },
            ];
          }

          // Si tiene roles, mapeamos normalmente
          return company.roles.map((role) => ({
            id: role.id,
            nombre: company.companyName,
            rol: role.name,
            logo: company.logo,
            companyId: company.companyId,
          }));
        });
        setCompaniesWithRoles(items);
      } catch (error) {
        console.error("Error al cargar compañías:", error);
      }
    };

    fetchData();
  }, []);

  const companyOptions = Array.from(
    new Map(
      currentItems &&
        currentItems.map((empresa) => [
          empresa.companyId,
          {
            id: empresa.companyId,
            label: empresa.nombre,
          },
        ])
    ).values()
  );

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
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-lg font-semibold">Listado de Reportes</h2>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reinicia la paginación al buscar
              }}
              className="border px-3 py-2 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <TableWithSortAndSearch
              columns={informationCompanyRole}
              data={sortedCurrentItems}
              loading={null}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onDelete={handleDelete}
            />

          </div>
          {/* Paginador */}
          <PaginatorTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </section>
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex items-center mb-4 gap-4">
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar rol" : "Asignar rol"}
              </h3>
            </div>

            {/* Control de pasos */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <SelectField
                  label="Compañía"
                  name="nombre"
                  value={data.nombre}
                  options={companyOptions}
                  onChange={(value) => {
                    setData((prev) => ({ ...prev, nombre: value }));
                    handleCompanyChange({ target: { value } }); // 👈 simula el evento si tu función lo espera así
                  }}
                />
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
                      <option key={index} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <StepNavigationButtons
              onCancel={handleCancel}
              onSubmit={editing ? handleUpdate : handleCreate}
              editing={editing}
            />
          </div>
        </div>
      )}
    </>
  );
}

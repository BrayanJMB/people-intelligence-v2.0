import {
  IconTrash,
  IconPlus,
  IconPencil,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { AllCompanies } from "./services/getAllCompanies.service";
import {
  createCompany,
  deleteCompany,
  updateCompany,
  updateStatusCompany,
} from "./services/company.service";
import { useMsal } from "@azure/msal-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveCompany,
  selectCurrentCompany,
} from "../../../features/companies/companiesSlice";
import { FormCompany } from "./components/FormCompany";
import { DeleteModal } from "./components/DeleteModal";
import { PaginatorTable } from "../../Paginator/PaginatorTable";
import { useInformationLogic } from "./hooks/useInformation";
import { getValue, sortItems } from "./utils/utils";
import { emptyCompanyForm } from "./initialValues";
import { FormCompanyColor } from "./components/FormCompanyColor";

export default function InformationEmpresas() {
  const {
    data,
    setData,
    companies,
    countries,
    sectors,
    sizeCompanies,
    errors,
    setErrors,
    validateFields,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useInformationLogic();
  const IconoPeople = "../../assets/img/people-icon.jpg";
  const dispatch = useDispatch();
  const currentCompany = useSelector(selectCurrentCompany);
  const [currentStep, setCurrentStep] = useState(2);
  const [step, setStep] = useState(2);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const { accounts } = useMsal();
  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  // Función para manejar los pasos del modal
  const handleNextStep = () => {
    if (validateFields()) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const [switchStates, setSwitchStates] = useState({});
  // Estado de los switches
  const handleSort = (field) => {
    if (sortField === field) {
      // Si ya estamos ordenando por ese campo, invertimos la dirección
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Si cambiamos de campo, reiniciamos a ascendente
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const sortedCurrentItems = sortItems(
    currentItems,
    sortField,
    sortDirection,
    getValue
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejador de cambios para el switch
  const handleSwitchChange = async (id) => {
    const newValue = !switchStates[id];
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
    await updateStatusCompany(id, { isActive: newValue });
    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };

  // modal empresas
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleCreate = async () => {
    setStep(1);
    // Cerrar el modal y resetear estado
    setOpenModal(false);
    await createCompany(accounts[0].localAccountId, data);
    setData(emptyCompanyForm);
    await fetchCompanies(); // 👈 Después trae los nuevos datos
  };

  // editar categorias
  const handleEdit = (empresa) => {
    setStep(1);
    setEditing(empresa);
    setData({
      idCompany: empresa.id,
      nombre: empresa.businessName,
      pais: empresa.idCountry,
      sedes: empresa.address,
      tamaño: empresa.idSizeCompany,
      sector: empresa.idSector,
      img: empresa.logo,
      activo: empresa.activo,
      // 🎨 Colores personalizados
      colorPrimario: empresa.colorPrincipal || "",
      colorsecundario: empresa.colorSecundario || "",
      colorTerciario: empresa.colorTerciario || "",
      HeaderColorTextos: empresa.headerColorTextos || "",
      HeaderColorIcons: empresa.headerColorIcons || "",
      navColorIcon: empresa.navColorIcon || "",
      navColorFondoIcon: empresa.navColorFondoIcon || "",
      btnPrimarioColor: empresa.btnPrimarioColor || "",
      btnPrimarioColorTexto: empresa.btnPrimarioColorTexto || "",
      btnSecundarioColor: empresa.btnSecundarioColor || "",
      btnSecundarioColorTexto: empresa.btnSecundarioColorTexto || "",
    });
    setOpenModal(true);
  };

  const confirmDelete = (companyId) => {
    setSelectedCompanyId(companyId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCompany(selectedCompanyId);
    setShowDeleteModal(false);
    setSelectedCompanyId(null);
    fetchCompanies();
    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };

  const handleUpdate = async () => {
    setStep(1);
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData(emptyCompanyForm);
    await updateCompany(data);
    await fetchCompanies(); // 👈 Después trae los nuevos datos
    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };
  const handleCancel = () => {
    setStep(1);
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setErrors({});
    setEditing(null);
    setData(emptyCompanyForm);
  };

  useEffect(() => {
    if (
      currentItems &&
      currentItems.length > 0 &&
      Object.keys(switchStates).length === 0
    ) {
      const initialStates = currentItems.reduce(
        (acc, empresa) => ({ ...acc, [empresa.id]: empresa.isActive }),
        {}
      );
      setSwitchStates(initialStates);
    }
  }, [currentItems]);
  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Empresas</h2>
            <p>(Empresas en vivo)</p>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Crear Empresa</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de empresas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("businessName")}
                    className="cursor-pointer"
                  >
                    Nombre de empresa{" "}
                    {sortField === "businessName" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("country")}
                    className="cursor-pointer"
                  >
                    País{" "}
                    {sortField === "country" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("sedes")}
                    className="cursor-pointer"
                  >
                    Sedes{" "}
                    {sortField === "sedes" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("sizeCompany")}
                    className="cursor-pointer"
                  >
                    Tamaño{" "}
                    {sortField === "sizeCompany" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("sector")}
                    className="cursor-pointer"
                  >
                    Sector{" "}
                    {sortField === "sector" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
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
                {sortedCurrentItems &&
                  sortedCurrentItems.map((empresa) => (
                    <tr key={empresa.id}>
                      <td className="py-5 px-4">
                        <p className="flex items-center gap-4">
                          <img
                            className="w-[30px] h-[30px] rounded-md"
                            src={empresa.logo || IconoPeople}
                            alt={`Imagen de ${empresa.businessName}`}
                          />
                          {empresa.businessName}
                        </p>
                      </td>
                      <td className="py-5 px-4 flex gap-2">
                        {empresa.country}
                      </td>
                      <td className="py-5 px-4">{empresa.address}</td>
                      <td className="py-5 px-4">{empresa.sizeCompany}</td>
                      <td className="py-5 px-4">{empresa.sector}</td>
                      <td className="py-5 px-4">
                        <span className="flex gap-1">
                          <IconPencil
                            className="cursor-pointer"
                            onClick={() => handleEdit(empresa)}
                          />
                          <IconTrash
                            className="cursor-pointer"
                            onClick={() => confirmDelete(empresa.id)}
                          />
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
                            className={`w-11 h-6 rounded-full transition duration-200 ${
                              switchStates[empresa.id]
                                ? "!bg-blue-600"
                                : "bg-gray-200"
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
          <PaginatorTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </section>
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex items-center mb-4 gap-4">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-3 text-gray-700 hover:text-gray-500 w-max ${
                  step === 1 && "hidden"
                }`}
              >
                <IconArrowLeft
                  stroke={2}
                  className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1"
                />
                {/* <IconArrowBigLeftFilled stroke={2} /> */}
              </button>
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar empresa" : "Crear empresa"}
              </h3>
            </div>

            {/* Control de pasos */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-x-4">
                <FormCompany
                  data={data}
                  setData={setData}
                  countries={countries}
                  sectors={sectors}
                  sizeCompanies={sizeCompanies}
                  errors={errors}
                  setErrors={setErrors}
                />
                {/* Navegación entre pasos */}
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleCancel}
                    className="btn btn-secundario px-4 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleNextStep()}
                    className="btn btn-principal px-4 py-2"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <FormCompanyColor data={data} setData={setData}/>
                {/* Navegación entre pasos */}
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
              </>
            )}
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

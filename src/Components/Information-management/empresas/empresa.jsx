import { IconPlus, IconArrowLeft } from "@tabler/icons-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
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
import { getValue, sortItems } from "../../utils/utils";
import { emptyCompanyForm } from "./initialValues";
import { FormCompanyColor } from "./components/FormCompanyColor";
import { StepNavigationButtons } from "../../shared/StepNavigationButtons";
import { useFilteredItems } from "../../Hooks/useFilteredItems";
import { TableWithSortAndSearch } from "../../shared/TableWithSortAndSearch";
import { informationCompanies } from "./schemas/tableCompany.schema";

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
    fetchCompanies,
    loading,
  } = useInformationLogic();

  const dispatch = useDispatch();
  const currentCompany = useSelector(selectCurrentCompany);
  const [currentStep, setCurrentStep] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { accounts } = useMsal();

  const { filteredItems } = useFilteredItems(
    companies,
    "businessName",
    searchTerm,
    sortField,
    sortDirection,
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handleNextStep = () => {
    if (!validateFields()) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const [switchStates, setSwitchStates] = useState({});

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

  const handleSwitchChange = async (id) => {
    const newValue = !switchStates[id];
    setSwitchStates((prevStates) => ({ ...prevStates, [id]: !prevStates[id] }));

    await toast.promise(updateStatusCompany(id, { isActive: newValue }), {
      loading: "Actualizando estado...",
      success: `Empresa ${newValue ? "activada" : "desactivada"}`,
      error: "Error al cambiar el estado",
    });

    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleCreate = async () => {
    setCurrentStep(1);
    setOpenModal(false);

    await toast.promise(createCompany(accounts[0].localAccountId, data), {
      loading: "Creando empresa...",
      success: "Empresa creada exitosamente",
      error: "Error al crear la empresa",
    });

    setData(emptyCompanyForm);
    await fetchCompanies();
  };

  const handleEdit = (empresa) => {
    setCurrentStep(1);
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
    setShowDeleteModal(false);
    setSelectedCompanyId(null);

    await toast.promise(deleteCompany(selectedCompanyId), {
      loading: "Eliminando empresa...",
      success: "Empresa eliminada exitosamente",
      error: "Error al eliminar la empresa",
    });

    await fetchCompanies();
    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };

  const handleUpdate = async () => {
    setCurrentStep(1);
    setOpenModal(false);
    setEditing(null);
    setData(emptyCompanyForm);

    await toast.promise(updateCompany(data), {
      loading: "Actualizando empresa...",
      success: "Empresa actualizada exitosamente",
      error: "Error al actualizar la empresa",
    });

    await fetchCompanies();
    if (accounts[0].localAccountId) {
      dispatch(fetchActiveCompany({ idUser: accounts[0].localAccountId }));
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
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
        {},
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
            onClick={() => setOpenModal(!openModal)}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Crear Empresa</span>
          </button>
        </section>

        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-lg font-semibold">Listado de empresas</h2>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <TableWithSortAndSearch
              columns={informationCompanies}
              data={sortedCurrentItems}
              loading={loading}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={confirmDelete}
              onToggle={handleSwitchChange}
              switchStates={switchStates}
            />
          </div>
          <PaginatorTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </section>
      </section>

      {openModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCancel}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4 gap-4">
              <button
                onClick={handlePrevStep}
                className={`flex items-center gap-3 text-gray-700 hover:text-gray-500 w-max ${
                  currentStep === 1 && "hidden"
                }`}
              >
                <IconArrowLeft
                  stroke={2}
                  className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1"
                />
              </button>
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar empresa" : "Crear empresa"}
              </h3>
            </div>

            {currentStep === 1 && (
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
              </div>
            )}

            {currentStep === 2 && (
              <FormCompanyColor data={data} setData={setData} />
            )}

            <StepNavigationButtons
              onCancel={handleCancel}
              onNext={handleNextStep}
              onSubmit={editing ? handleUpdate : handleCreate}
              editing={editing}
              currentStep={currentStep}
              totalSteps={2}
            />
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

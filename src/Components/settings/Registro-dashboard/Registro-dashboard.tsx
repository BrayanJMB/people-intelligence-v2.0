import listIcon from "/assets/svg/list.svg";
import { useSelector } from "react-redux";
import { IconTrash, IconPencil, IconEye } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { SectionToolbar } from "../../shared/SectionToolbar";
import { PaginatorTable } from "../../Paginator/PaginatorTable";
import { DashboardModal } from "./components/DashboardModal";
import { GetAllReports } from "../Registrar-reporte/services/reports.service";
import { AllCompanies } from "../../Information-management/empresas/services/company.service";
import {
  CreateDashboard,
  getAllDashboards,
  UpdateDashboard,
  ToggleDashboardStatus,
  getAllDashboardsById,
} from "./services/dashboard.services";
import { Dashboard, Report, Company } from "./types/dashboard.types";
import { DashboardModalProps } from "./types/dashboard.types";
import { selectCurrentCompany } from "../../../features/companies/companiesSlice";
import { Link } from "react-router-dom";
export default function RegistroDashboard() {
  const currentCompany = useSelector(selectCurrentCompany);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [reports, setReports] = useState<Report[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [step, setStep] = useState<number>(1);
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editing, setEditing] = useState<Dashboard | null>(null);

  const [data, setData] = useState<DashboardModalProps["data"]>({
    Id: "",
    reportId: "",
    groupId: "",
    powerByDescriptionDashboardId: "",
    companyId: "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(dashboards.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSwitchChange = async (id: string) => {
    const newState = !switchStates[id];
    setSwitchStates((prev) => ({ ...prev, [id]: newState }));

    // Llama al servicio para guardar el cambio
    try {
      await ToggleDashboardStatus(id, newState);
    } catch (error) {
      console.error("Error al cambiar estado del dashboard:", error);
      // Revertir el estado si falla
      setSwitchStates((prev) => ({ ...prev, [id]: !newState }));
    }
  };

  const handleCreate = async () => {
    await CreateDashboard(data);
    setOpenModal(false);
    setData({
      reportId: "",
      groupId: "",
      powerByDescriptionDashboardId: "",
      companyId: "",
    });
    await fetchDashboardById(currentCompany?.id);
  };

  const handleEdit = (dashboard: Dashboard) => {
    setStep(1);
    setEditing(dashboard);
    setData({
      Id: dashboard.id,
      reportId: dashboard.reportId,
      groupId: dashboard.groupId,
      powerByDescriptionDashboardId: dashboard.powerByDashboardDescpritionId,
      companyId: dashboard.companyId,
      powerByDescriptionDashboard: dashboard.reportDescription,
    });
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    await UpdateDashboard(data);
    setOpenModal(false);
    setEditing(null);
    setData({
      reportId: "",
      groupId: "",
      powerByDescriptionDashboardId: "",
      companyId: "",
      powerByDescriptionDashboard: "",
    });
    await fetchDashboardById(currentCompany?.id);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    console.log("Eliminar", id);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedReport = reports.find((r) => r.id == selectedId);

    setData((prev: any) => ({
      ...prev,
      powerByDescriptionDashboardId: selectedId,
      powerByDescriptionDashboard: selectedReport?.description || "",
    }));
  };

  const fetchAllDashboards = async () => {
    const data = await getAllDashboards();
    setDashboards(data);
  };

  const fetchAllReports = async () => {
    const data = await GetAllReports();
    setReports(data);
  };

  const fetchAllCompanies = async () => {
    const data = await AllCompanies();
    setCompanies(data);
  };

  const fetchDashboardById = async (companyId: string) => {
    const data = await getAllDashboardsById(companyId);
    setDashboards(data);
  };

  useEffect(() => {
    fetchAllCompanies();
    fetchAllReports();
  }, []);

  useEffect(() => {
    const initialStates = dashboards.reduce(
      (acc, dashboard) => ({ ...acc, [dashboard.id]: dashboard.isActive }),
      {}
    );
    setSwitchStates(initialStates);
  }, [dashboards]);

  useEffect(() => {
    if (!currentCompany) return;
    fetchDashboardById(currentCompany.id);
  }, [currentCompany]);

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <SectionToolbar
          title="Dashboard"
          buttonText="Crear Dashboard"
          onAddClick={() => setOpenModal(!openModal)}
        />
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
                {dashboards &&
                  dashboards
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((dashboard) => (
                      <tr key={dashboard.id}>
                        <td className="py-5 px-4">
                          <p className="flex items-center gap-4">
                            {dashboard.reportName}
                          </p>
                        </td>
                        <td className="py-5 px-4 flex gap-2 items-center">
                          <div className="img-contain bg-[#ECEEF6] p-1 rounded">
                            <img
                              src={dashboard.companyLogo}
                              className=""
                              width={25}
                              height={25}
                              alt=""
                            />
                          </div>
                          {dashboard.companyName}
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
                                switchStates[dashboard.id]
                                  ? "translate-x-5"
                                  : ""
                              }`}
                            ></div>
                          </label>
                        </td>
                        <td className="py-5 px-4">
                          <span className="flex gap-1">
                            {switchStates[dashboard.id] && (
                              <Link to={`/powerbi/${dashboard.id}`}>
                                <IconEye className="cursor-pointer" />
                              </Link>
                            )}
                            <IconPencil
                              className="cursor-pointer"
                              onClick={() => handleEdit(dashboard)}
                            />
                            <IconTrash
                              className="cursor-pointer"
                              onClick={() => handleDelete(dashboard.id)}
                            />
                          </span>
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
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar dashboard" : "Crear dashboard"}
              </h3>
            </div>

            {/* Control de pasos */}
            <DashboardModal
              isEditing={!!editing}
              data={data}
              reports={reports}
              companies={companies}
              onChange={(key: keyof typeof data, value: string) =>
                setData((prev) => ({ ...prev, [key]: value }))
              }
              onChangeReport={(e) => handleReportChange(e)}
              onCancel={handleCancel}
              onSubmit={editing ? handleUpdate : handleCreate}
              currentStep={currentStep}
            />
          </div>
        </div>
      )}
    </>
  );
}

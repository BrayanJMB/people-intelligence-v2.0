import listIcon from "/assets/svg/list.svg";
import ImgConversacion from "/assets/img/conversacion.jpg";

import {
  IconTrash,
  IconPencil,
  IconEye,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { SectionToolbar } from "../../shared/SectionToolbar";
import { PaginatorTable } from "../../Paginator/PaginatorTable";
import { DashboardModal } from "./components/DashboardModal";
import { GetAllReports } from "../Registrar-reporte/services/reports.service";
import { AllCompanies } from "../../Information-management/empresas/services/company.service";
import { CreateDashboard, getAllDashboards } from "./components/services/dashboard.services";
export default function RegistroDashboard() {

  const [currentStep, setCurrentStep] = useState(1);
  const [reports,setReports] = useState([]);
  const [dashboards,setDashboards] = useState([]);
  const [companies,setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de dashboards por página
  const [step, setStep] = useState(1);
  // Estado de los switches
  const [switchStates, setSwitchStates] = useState(
    dashboards.reduce(
      (acc, dashboard) => ({ ...acc, [dashboard.id]: dashboard.isActive }),
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
  console.log(switchStates)

  // modal dashboards
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    reportId: "",
    groupId: "",
    powerByDescriptionDashboardId:"",
    companyId: "",
    activo: false,
  });

  const handleCreate = () => {
    CreateDashboard(data)
    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      reportId: "",
      groupId: "",
      powerByDescriptionDashboardId:"",
      companyId: "",
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
    /*setData({
      nombre: "",
      grupo: "",
      nombreCompany: "",
      nombreReporte: "",
      description: "",
      activo: false,
    });*/
  };
  const handleCancel = () => {
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    /*setData({
      nombre: "",
      grupo: "",
      nombreCompany: "",
      nombreReporte: "",
      description: "",
      activo: false,
    });*/
  };

  const handleDelete = (id) => {
    // funcion para eliminar por id

    console.log("producto eliminado " + id);
  };

  const handleReportChange = (e) => {
    const selectedId = e.target.value;
    // Buscar el reporte por ID
    const selectedReport = reports.find(report => report.id == selectedId);
    // Actualizar las dos propiedades usando setData
    setData(prev => ({
      ...prev,
      powerByDescriptionDashboardId: selectedId,
      powerByDescriptionDashboard: selectedReport?.description || ""
    }));
  };
  
  const fetchAllDashboards = async () =>{
    const data = await getAllDashboards();
    setDashboards(data);
  }
  const fetchAllReports = async () =>{
    const data = await GetAllReports()
    setReports(data)
  }
    
  const fetchAllCompanies = async () =>{
    const data = await AllCompanies()
    setCompanies(data);
  }

  useEffect(() => {
    fetchAllDashboards();
    fetchAllCompanies();
    fetchAllReports();
    console.log("1")
    const initialStates = dashboards.reduce(
      (acc, empresa) => ({ ...acc, [empresa.id]: empresa.isActive }),
      {}
    );
    setSwitchStates(initialStates);
  }, [])
  
  useEffect(() => {
    const initialStates = dashboards.reduce(
      (acc, empresa) => ({ ...acc, [empresa.id]: empresa.isActive }),
      {}
    );
    setSwitchStates(initialStates);
  }, [dashboards])
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
                {dashboards && dashboards.map((dashboard) => (
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
              onChange={(key, value) =>
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

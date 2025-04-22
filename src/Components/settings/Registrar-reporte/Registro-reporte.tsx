import listIcon from "/assets/svg/list.svg";
import { IconTrash,  IconPencil } from "@tabler/icons-react";
import { Report } from "./interfaces/CreatePowerDashboardDescriptionDto";
import {
  GetAllReports,
  DeleteReport,
  CreateReport,
  UpdateReport,
} from "./services/reports.service";
import { useState, useEffect } from "react";
import { PaginatorTable } from "../../Paginator/PaginatorTable";
import { DeleteModal } from "../../Information-management/empresas/components/DeleteModal";
import { ReportModal } from "./components/ReportModal";
import { SectionToolbar } from "../../shared/SectionToolbar";

export default function RegistroReporte() {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [reportToDeleteId, setReportToDeleteId] = useState<string | null>(null);
  const itemsPerPage = 6;
  const [step, setStep] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editing, setEditing] = useState<Report | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [data, setData] = useState<{
    id?: string;
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = async () => {
    await CreateReport(data);
    await fetchAllReports();
    setOpenModal(false);
    setData({ name: "", description: "" });
  };

  const handleEdit = (report: Report) => {
    setStep(1);
    setEditing(report);
    setData({
      id: report.id,
      name: report.name,
      description: report.description,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    UpdateReport(data);
    setOpenModal(false);
    setEditing(null);
    setData({ name: "", description: "" });
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditing(null);
    setData({ name: "", description: "" });
  };

  const handleDelete = async (id: string) => {
    await DeleteReport(id);
    await fetchAllReports();
  };

  const fetchAllReports = async () => {
    const data = await GetAllReports();
    setReports(data);
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <SectionToolbar
          title="Reportes"
          onAddClick={() => setOpenModal(!openModal)}
          buttonText="Crear Reportes"
        />

        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de reportes</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img src={listIcon} alt="Ordenar reportes" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Descripción
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((report) => (
                    <tr key={report.id}>
                      <td className="py-5 px-4">{report.name}</td>
                      <td className="py-5 px-4">{report.description}</td>
                      <td className="py-5 px-4">
                        <span className="flex gap-1">
                          <IconPencil
                            onClick={() => handleEdit(report)}
                            className="cursor-pointer"
                          />
                          <IconTrash
                            className="cursor-pointer"
                            onClick={() => {
                              setReportToDeleteId(report.id!);
                              setShowDeleteModal(true);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <PaginatorTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </section>
      </section>

      {openModal && (
        <ReportModal
          isEditing={!!editing}
          data={data}
          onChange={(key, value) =>
            setData((prev) => ({ ...prev, [key]: value }))
          }
          onCancel={handleCancel}
          onSubmit={editing ? handleUpdate : handleCreate}
          currentStep={currentStep}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (reportToDeleteId) {
              handleDelete(reportToDeleteId);
              setShowDeleteModal(false);
              setReportToDeleteId(null); // limpiar después de borrar
            }
          }}
        />
      )}
    </>
  );
}

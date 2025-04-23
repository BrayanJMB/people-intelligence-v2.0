import { StepNavigationButtons } from "../../../shared/StepNavigationButtons";
import { ModalBase } from "../../../shared/ModalBase";
import { Report, Company } from "../types/dashboard.types";
import { DashboardModalProps } from "../types/dashboard.types";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../../../features/companies/companiesSlice";
import { useEffect } from "react";
export function DashboardModal({
  isEditing,
  data,
  reports,
  companies,
  onChange,
  onChangeReport,
  onCancel,
  onSubmit,
  currentStep,
}: DashboardModalProps) {
  const currentCompany = useSelector(selectCurrentCompany);

  useEffect(() => {
    if (!data.companyId && currentCompany?.id) {
      onChange("companyId", currentCompany.id);
    }
  }, [data.companyId, currentCompany]);
  return (
    <ModalBase isEditing={isEditing}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-1">
          <label htmlFor="groupId" className="text-[14px]">
            Grupo ID
          </label>
          <input
            type="text"
            name="groupId"
            value={data.groupId}
            onChange={(e) => onChange("groupId", e.target.value)}
            placeholder="Escribe aquí"
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="reportId" className="text-[14px]">
            Report ID
          </label>
          <input
            type="text"
            name="reportId"
            value={data.reportId}
            onChange={(e) => onChange("reportId", e.target.value)}
            placeholder="Escribe aquí"
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="companyId" className="text-[14px]">
            Nombre compañía
          </label>
          <select
            name="companyId"
            value={data.companyId || currentCompany?.id}
            onChange={(e) => onChange("companyId", e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="" disabled>
              Seleccione una compañía
            </option>
            {companies.map((company, index) => (
              <option key={index} value={company.id}>
                {company.businessName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label
            htmlFor="powerByDescriptionDashboardId"
            className="text-[14px]"
          >
            Nombre Reporte
          </label>
          <select
            name="powerByDescriptionDashboardId"
            value={data.powerByDescriptionDashboardId}
            onChange={onChangeReport}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="" disabled>
              Seleccione un reporte
            </option>
            {reports.map((report, index) => (
              <option key={index} value={report.id}>
                {report.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="powerByDescriptionDashboard" className="text-[14px]">
            Descripción
          </label>
          <textarea
            name="powerByDescriptionDashboard"
            value={data.powerByDescriptionDashboard ?? ""}
            onChange={(e) =>
              onChange("powerByDescriptionDashboard", e.target.value)
            }
            placeholder="Escribe aquí..."
            className="w-full p-2 border rounded mb-4 resize-none"
            rows={4}
            disabled
          />
        </div>
      </div>

      <StepNavigationButtons
        onCancel={onCancel}
        onSubmit={onSubmit}
        editing={isEditing}
        currentStep={currentStep}
        totalSteps={1}
      />
    </ModalBase>
  );
}

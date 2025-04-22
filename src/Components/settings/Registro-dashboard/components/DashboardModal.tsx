import { StepNavigationButtons } from "../../../shared/StepNavigationButtons";
import { ModalBase } from "../../../shared/ModalBase";

interface DashboardModalProps {
  isEditing: boolean;
  data: {
    reportId: string;
    groupId: string;
    powerByDescriptionDashboardId: number;
    companyId: number;
    activo: boolean;
  };
  reports:[];
  companies:[];
  onChange: (key: keyof DashboardModalProps["data"], value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onChangeReport: () => void;
  currentStep: number;
}

export function DashboardModal({
  isEditing,
  data,
  onChange,
  onChangeReport,
  onCancel,
  onSubmit,
  currentStep,
  reports,
  companies,
}: DashboardModalProps) {
    console.log(reports)
  return (
    <ModalBase isEditing={isEditing}>
      <div className="grid grid-cols-2 gap-x-4">
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
          <label htmlFor="companyId" className="text-[14px]">
            Nombre compañía
          </label>
          <select
            name="companyId"
            value={data.companyId}
            onChange={(e) => onChange("companyId", e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="" disabled selected>
              Seleccione una compañía
            </option>
            {companies &&
              companies.map((company, index) => (
                <option key={index} value={company.id}>
                  {company.businessName}
                </option>
              ))}
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="powerByDescriptionDashboardId" className="text-[14px]">
            Nombre Reporte
          </label>
          <select
            name="powerByDescriptionDashboardId"
            value={data.powerByDescriptionDashboardId}
            onChange={(e) => onChangeReport(e)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="" disabled selected>
              Seleccione un reporte
            </option>
            {reports &&
              reports.map((report, index) => (
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
            value={data.powerByDescriptionDashboard}
            onChange={(e) =>
              onChange("powerByDescriptionDashboard", e.target.value)
            }
            placeholder="Escribe aquí..."
            className="w-full p-2 border rounded mb-4 resize-none"
            rows={4}
            disabled // ✅ Aquí lo deshabilitas
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

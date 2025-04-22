// components/ReportModal.tsx

import { StepNavigationButtons } from "../../../shared/StepNavigationButtons";
import { ModalBase } from "../../../shared/ModalBase";
interface ReportModalProps {
  isEditing: boolean;
  data: { name: string; description: string };
  onChange: (key: "name" | "description", value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  currentStep: number;
}

export function ReportModal({
  isEditing,
  data,
  onChange,
  onCancel,
  onSubmit,
  currentStep,
}: ReportModalProps) {
  return (
    <ModalBase isEditing={isEditing}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2">
          <label className="text-[14px]">Nombre</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Escribe aquí"
            className="w-full p-2 border rounded mb-4"
          />
        </div>

        <div className="col-span-2">
          <label className="text-[14px]">Descripción</label>
          <textarea
            name="description"
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Escribe aquí..."
            className="w-full p-2 border rounded mb-4 resize-none"
            rows={4}
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

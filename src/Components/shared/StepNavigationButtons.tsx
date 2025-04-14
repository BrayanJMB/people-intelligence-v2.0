interface StepNavigationButtonsProps {
    onCancel: () => void;
    onNext?: () => void;
    onSubmit?: () => void;
    isLastStep?: boolean;
    editing?: boolean;
    currentStep: number;
    totalSteps: number;
  }
  
  export const StepNavigationButtons: React.FC<StepNavigationButtonsProps> = ({
    onCancel,
    onNext,
    onSubmit,
    isLastStep = false,
    editing = false,
    currentStep,
    totalSteps,
  }) => {
    const isFinal = currentStep === totalSteps;
  
    return (
      <div className="col-span-4 flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="btn btn-secundario px-4 py-2"
        >
          Cancelar
        </button>
  
        {isFinal ? (
          <button
            onClick={onSubmit}
            className="btn btn-principal px-4 py-2"
          >
            {editing ? "Actualizar" : "Crear"}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="btn btn-principal px-4 py-2"
          >
            Siguiente
          </button>
        )}
      </div>
    );
  };
  
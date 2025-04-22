type ModalBaseProps = {
  isEditing: boolean;
  children: React.ReactNode;
};

export const ModalBase = ({ isEditing, children }: ModalBaseProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
        <div className="flex items-center mb-4 gap-4">
          <h3 className="text-[22px] font-bold">
            {isEditing ? "Editar reportes" : "Crear reportes"}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
};

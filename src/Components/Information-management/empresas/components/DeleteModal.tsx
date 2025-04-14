interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          ¿Estás seguro de eliminar la compañía?
        </h2>
        <p className="text-gray-700 mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

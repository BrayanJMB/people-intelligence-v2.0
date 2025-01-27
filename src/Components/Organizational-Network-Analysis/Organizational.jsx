import { useState } from "react";
import {
  IconDownload,
  IconUpload,
  IconExclamationCircle,
  IconTrash,
  IconSend,
} from "@tabler/icons-react";

export default function OrganizationalNetworkAnalysis() {
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // Simula una subida de archivo después de un tiempo
      setTimeout(() => {
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
      }, 1000); // Simula el tiempo de subida del archivo
    }
  };

  const handleDeleteFile = () => {
    setIsModalOpen(true); 
  };

  const confirmDelete = () => {
    setFileName(""); 
    setFile(null); 
    setIsModalOpen(false); 
  };

  const cancelDelete = () => {
    setIsModalOpen(false); 
  };

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-[18px] font-bold mt-5 mb-11">
          Organizational Network Analysis
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-9">
        <div className="col-span-1 bg-white border-[#ccc] border rounded-[16px] pb-20">
          <h2 className="btn-principal text-center text-[24px] font-bold rounded-[16px] p-3">
            Paso 1
          </h2>
          <div className="p-6 h-full flex flex-col">
            <h3 className="font-bold pb-5 pt-2">
              Es la primera vez que subo usuarios a la plataforma.
            </h3>
            <p>
              Es importante que te descargues la planilla base, ya que cuenta
              con las columnas necesarias para la importación y así evitar
              posibles errores.
            </p>
            <button className="flex items-center justify-center border w-full my-4 p-3 border-[#ccc] mt-auto gap-1">
              Descargar Plantilla
              <IconDownload />
            </button>
          </div>
        </div>

        <div className="col-span-1 bg-white border-[#ccc] border rounded-[16px] pb-20">
          <h2 className="btn-principal text-center text-[24px] font-bold rounded-[16px] p-3">
            Paso 2
          </h2>
          <div className="p-6 h-full flex flex-col relative">
            <h3 className="font-bold pb-5 pt-2">
              Ya tengo una plantilla completa lista para subir
            </h3>
            <p>
              Ahora sí, ya puedes subirla para que podamos procesar los datos y
              luego confirmar la importación.
            </p>

            {/* Input para subir archivo oculto */}
            <input
              type="file"
              onChange={handleFileChange}
              id="file-upload" 
              className="hidden"
            />

            {/* Label que simula el botón para subir la plantilla */}
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center border w-full my-4 p-3 border-[#ccc] mt-auto cursor-pointer gap-1"
            >
              Subir plantilla
              <IconUpload />
            </label>

            {fileName && (
              <div className="absolute bottom-0 w-full text-center left-0 items-center flex justify-center">
                <span>{fileName}</span>
                <button
                  onClick={handleDeleteFile}
                  className="ml-2"
                >
                  <IconTrash />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 bg-white border-[#ccc] border rounded-[16px] pb-20">
          <h2 className="btn-principal text-center text-[24px] font-bold rounded-[16px] p-3">
            Paso 3
          </h2>
          <div className="p-6 h-full flex flex-col">
            <h3 className="font-bold pb-5 pt-2">
              Compartir por correo electrónico
            </h3>
            <button className="flex items-center justify-center border w-full my-4 p-3 border-[#ccc] mt-auto gap-1">
              Enviar correo
              <IconSend />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#E9EBF0] w-3/5 col-span-3 mx-auto flex p-8 rounded-lg gap-4 mt-11">
        <div className="w-8/12">
          <h3 className="flex items-center gap-2 mb-2 font-bold">
            <IconExclamationCircle /> Importante
          </h3>
          <p>
            Recuerda que cuanto más completos sean los datos de los empleados,
            mejores reportes de encuestas obtendrás cuando quieras filtrar por
            departamentos, oficinas, género, edad, etc. <br />
            <br /> Podrás actualizarlos cuando quieras, pero recuerda que los
            cambios entrarán en vigencia para las encuestas posteriores.
          </p>
        </div>
        <hr className="border-gray-300 border h-full mx-4" />
        <div className="w-4/12">
          <p className="text-center mb-2">
            Mira este <span className="font-bold">vídeo tutorial</span>
          </p>
          <img src="/assets/img/video-ejemplo.jpg" alt="" />
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[450px]">
            <h3 className="text-xl font-bold mb-4">
              ¿Estás seguro de que deseas eliminar este archivo?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="btn btn-secundario"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 btn-principal rounded-lg btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

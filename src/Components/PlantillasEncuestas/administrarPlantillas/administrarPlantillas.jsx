import { Link } from "react-router-dom";

export default function AdministrarPlantillas({ titulo }) {

  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    titulo(title); // Actualiza el título con el nombre del enlace clickeado
  };

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <div>
        <Link
          className="flex items-center gap-2 text-gray-700 hover:text-gray-500 w-max"
          to={"/employeejourney"}
          onClick={() => handleLinkClick("Employee Journey")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 text-[#1D70B7]"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          Volver
        </Link>
      </div>
      <h3 className="font-bold text-[22px] mt-3 mb-3">Administrar encuestas</h3>

      <section>
        <div className="bg-[#E9EBF0] flex justify-around rounded-lg ">
          <button
            className={`w-[200px] py-3 rounded-none -4 border-t-4 border-t-transparent border-[#1D70B7]`}
          >
            Categorías
          </button>
          <button className={`-4 border-t-4 border-transparent`}>Mapas</button>
          <button className={`-4 border-t-4 border-transparent`}>
            Plantilla
          </button>
          <button className={`-4 border-t-4 border-transparent`}>
            Encuesta de mapas
          </button>
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="font-[400] my-8">Listado de categorías</h2>
          <button className="w-max  text-center flex justify-center items-center gap-3 p-2 text-white bg-[#1D70B7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>{" "}
            <span>Añadir demografico</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="">
                <th className="py-5 px-4  text-left text-[#606060] font-normal">
                  ID
                </th>
                <th className="py-5 px-4  text-left text-[#606060] font-normal">
                  Nombre
                </th>
                <th className="py-5 px-4  text-left text-[#606060] font-normal">
                  Descripción
                </th>
                <th className="py-5 px-4  text-left text-[#606060] font-normal">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Procesos</td>
                <td className="py-5 px-4 ">
                  Procesos de recursos humanos en el ciclo de vida del
                  colaborador
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="py-5 px-4 ">0248</td>
                <td className="py-5 px-4 ">Organización</td>
                <td className="py-5 px-4 ">
                  Aspectos organizacionales del proceso del empleado
                </td>
                <td className="py-5 px-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

import listIcon from "/assets/svg/list.svg";
import ImgConversacion from "/assets/img/conversacion.jpg";
import {
  IconTrash,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconUpload,
  IconArrowBigLeft,
  IconArrowBigLeftFilled,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { AllCompanies } from "./services/getAllCompanies.service";
import { AllCountries } from "./services/getAllCountries.service";
import { AllSectors } from "./services/getAllSector.service";
import { fetchAllSizeCompanies } from "./services/sizeCompany.services";

export default function InformationEmpresas() {
  const empresas = [
    {
      id: 1,
      nombre: "Encuesta de inicio de actividades laborales #1",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: false,
    },
    {
      id: 2,
      nombre: "Encuesta de fin de actividades laborales #2",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: true,
    },
    {
      id: 3,
      nombre: "Encuesta de rendimiento laboral #3",
      pais: "colombia",
      sedes: "bogota",
      tamaño: "hasta 200 empleados",
      sector: "financiero",
      img: ImgConversacion,
      activo: true,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Número de empresas por página

  const [currentStep, setCurrentStep] = useState(1);
  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState("");
  const [countries, setCountries] = useState("");
  const [sectors, setSectors] = useState("");
  const [sizeCompanies, setSizeCompanies] = useState("");
  // Función para manejar los pasos del modal
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Estado de los switches
  const [switchStates, setSwitchStates] = useState(
    empresas.reduce(
      (acc, empresa) => ({ ...acc, [empresa.id]: empresa.activo }),
      {}
    )
  );

  // Calcula el índice de los elementos mostrados en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = empresas.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(empresas.length / itemsPerPage);

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

  // modal empresas
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [data, setData] = useState({
    nombre: "",
    pais: "",
    sedes: "",
    tamaño: "",
    sector: "",
    img: null,
    activo: false,
    colorPrimario: "",
    colorSecundario: "",
    colorTerciario: "",
    HeaderColorTextos: "",
    HeaderColorIcons: "",
    navColorIcon: "",
    navColorFondoIcon: "",
    btnPrimarioColor: "",
    btnPrimarioColorTexto: "",
    btnPrimarioColor: "",
    btnPrimarioColorTexto: "",
    btnSecundarioColor: "",
    btnSecundarioColorTexto: "",
  });

  const handleCreate = () => {
    setStep(1);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    console.log("Creando categoría:", data);

    // Cerrar el modal y resetear estado
    setOpenModal(false);
    setData({
      nombre: "",
      pais: "",
      sedes: "",
      tamaño: "",
      sector: "",
      img: null,
      activo: false,
      colorPrimario: "",
      colorsecundario: "",
      colorTerciario: "",
      HeaderColorTextos: "",
      HeaderColorIcons: "",
      navColorIcon: "",
      navColorFondoIcon: "",
      btnPrimarioColor: "",
      btnPrimarioColorTexto: "",
      btnPrimarioColor: "",
      btnPrimarioColorTexto: "",
      btnSecundarioColor: "",
      btnSecundarioColorTexto: "",
    });
  };

  // editar categorias
  const handleEdit = (empresa) => {
    setStep(1);
    setEditing(empresa);
    setData({
      nombre: empresa.nombre,
      pais: empresa.pais,
      sedes: empresa.sedes,
      tamaño: empresa.tamaño,
      sector: empresa.sector,
      img: empresa.img,
      activo: empresa.activo,
    });
    setOpenModal(true);
  };

  const handleUpdate = () => {
    setStep(1);
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando mapa:", data);
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      pais: "",
      sedes: "",
      tamaño: "",
      sector: "",
      img: null,
      activo: false,
      colorPrimario: "",
      colorsecundario: "",
      colorTerciario: "",
      HeaderColorTextos: "",
      HeaderColorIcons: "",
      navColorIcon: "",
      navColorFondoIcon: "",
      btnPrimarioColor: "",
      btnPrimarioColorTexto: "",
      btnSecundarioColor: "",
      btnSecundarioColorTexto: "",
    });
  };
  const handleCancel = () => {
    setStep(1);
    // Realiza la lógica para actualizar el mapa
    setOpenModal(false);
    setEditing(null);
    setData({
      nombre: "",
      pais: "",
      sedes: "",
      tamaño: "",
      sector: "",
      img: null,
      activo: false,
      colorPrimario: "",
      colorsecundario: "",
      colorTerciario: "",
      HeaderColorTextos: "",
      HeaderColorIcons: "",
      navColorIcon: "",
      navColorFondoIcon: "",
      btnPrimarioColor: "",
      btnPrimarioColorTexto: "",
      btnSecundarioColor: "",
      btnSecundarioColorTexto: "",
    });
  };
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await AllCompanies();
        console.log(data);
        setCompanies(data);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const data = await AllCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
      }
    };
    const fetchSector = async () => {
      try {
        const data = await AllSectors();
        setSectors(data);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
      }
    };

    const fetchSizeCompany = async () => {
      try {
        const data = await fetchAllSizeCompanies();
        setSizeCompanies(data);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
      }
    };
    fetchCompanies();
    fetchCountries();
    fetchSector();
    fetchSizeCompany();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
        <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
          <div>
            <h2 className="font-bold text-[22px]">Empresas</h2>
            <p>(Empresas en vivo)</p>
          </div>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className="btn btn-principal"
          >
            <IconPlus />
            <span>Crear Empresa</span>
          </button>
        </section>
        <section className="my-6 bg-white p-8 rounded-[20px]">
          <div className="flex justify-between items-center px-4">
            <h2>Listado de empresas</h2>
            <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
              <span className="font-[400]">Ordenar</span>
              <img className="" src={listIcon} alt="Ordenar empresas" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Nombre de empresa
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Pais
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Sedes
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Tamaño de la empresa
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Sector
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Opciones
                  </th>
                  <th className="py-5 px-4 text-left text-[#606060] font-normal">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((empresa) => (
                  <tr key={empresa.id}>
                    <td className="py-5 px-4">
                      <p className="flex items-center gap-4">
                        <img
                          className="w-[30px] h-[30px] rounded-md"
                          src={empresa.img}
                          alt={`Imagen de ${empresa.businessName}`}
                        />
                        {empresa.businessName}
                      </p>
                    </td>
                    <td className="py-5 px-4 flex gap-2">
                      {empresa.businessName}
                    </td>
                    <td className="py-5 px-4">{empresa.businessName}</td>
                    <td className="py-5 px-4">{empresa.businessName}</td>
                    <td className="py-5 px-4">{empresa.businessName}</td>
                    <td className="py-5 px-4">
                      <span className="flex gap-1">
                        <IconPencil onClick={() => handleEdit(empresa)} />
                        <IconTrash />
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={switchStates[empresa.id]}
                          onChange={() => handleSwitchChange(empresa.id)}
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition duration-200 ${
                            switchStates[empresa.id]
                              ? "!bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                            switchStates[empresa.id] ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginador */}
          <div className="flex justify-center mt-4">
            <button
              className={`px-3 py-1 mx-1 border ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IconChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 mx-1 border ${
                    currentPage === pageNumber ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              className={`px-3 py-1 mx-1 border ${
                currentPage === totalPages ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <IconChevronRight />
            </button>
          </div>
        </section>
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex items-center mb-4 gap-4">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-3 text-gray-700 hover:text-gray-500 w-max ${
                  step === 1 && "hidden"
                }`}
              >
                <IconArrowLeft
                  stroke={2}
                  className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1"
                />
                {/* <IconArrowBigLeftFilled stroke={2} /> */}
              </button>
              <h3 className="text-[22px] font-bold">
                {editing ? "Editar empresa" : "Crear empresa"}
              </h3>
            </div>

            {/* Control de pasos */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <label htmlFor="nombre" className="text-[14px]">
                    Nombre de empresa
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={data.nombre}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    placeholder="Ingresa el nombre de la empresa"
                    className="w-full p-2 border rounded mb-4"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="pais" className="text-[14px]">
                    País
                  </label>
                  <select
                    name="pais"
                    value={data.pais}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, pais: e.target.value }))
                    }
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="sedes" className="text-[14px]">
                    Sedes
                  </label>
                  <input
                    type="text"
                    name="sedes"
                    value={data.sedes}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, sedes: e.target.value }))
                    }
                    placeholder="Ingresa la sede"
                    className="w-full p-2 border rounded mb-4"
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="tamaño" className="text-[14px]">
                    Tamaño de la empresa
                  </label>
                  <select
                    type="text"
                    name="tamaño"
                    value={data.tamaño}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, tamaño: e.target.value }))
                    }
                    placeholder="Tamaño"
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="">Seleccione un tamaño de empresa</option>
                    {sizeCompanies.map((sizeCompany) => (
                      <option key={sizeCompany.id} value={sizeCompany.id}>
                        {sizeCompany.quantityEmployess}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="sector" className="text-[14px]">
                    Sector
                  </label>
                  <select
                    type="text"
                    name="sector"
                    value={data.sector}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, sector: e.target.value }))
                    }
                    placeholder="Sector"
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="">Seleccione un sector</option>
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.sectorName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="img" className="text-[14px]">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="img"
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, img: e.target.files[0] }))
                    }
                    className="w-full p-2 border rounded mb-4"
                  />
                </div>

                {/* Navegación entre pasos */}
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleCancel}
                    className="btn btn-secundario px-4 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="btn btn-principal px-4 py-2"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-4 gap-x-4">
                <input type="hidden" name="activo" value={data.activo} />
                {/* color Primario */}
                <div className="col-span-4">
                  <h2 className="font-bold my-3">Colores del tema</h2>
                </div>
                <div className="grid grid-cols-3 col-span-4">
                  <div className="col-span-1">
                    <label htmlFor="colorPrimario" className="text-[14px]">
                      Color Primario
                    </label>
                    <div className="relative flex items-center justify-center mb-4">
                      <label
                        htmlFor="colorPrimario"
                        className={`absolute w-4/5 top-0 h-10 flex items-center justify-center right-0 cursor-pointer bg-[rgba(255,255,255,0.8)] px-5 ${
                          data.colorPrimario ? "flex" : "hidden"
                        }`}
                      >
                        {data.colorPrimario ? data.colorPrimario : ""}
                      </label>
                      <input
                        type="color"
                        id="colorPrimario"
                        name="colorPrimario"
                        value={data.colorPrimario || "#ffffff"} // Usa #ffffff si no hay color seleccionado
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            colorPrimario: e.target.value, // Actualiza el color seleccionado
                          }))
                        }
                        className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                      />
                    </div>
                  </div>

                  {/* colores principales */}
                  <div className="col-span-2 row-span-3"></div>

                  {/* color Secundario */}
                  <div className="col-span-1">
                    <label htmlFor="colorSecundario" className="text-[14px]">
                      Color Secundario{" "}
                    </label>
                    <div className="relative flex items-center justify-center mb-4">
                      <label
                        htmlFor="colorSecundario"
                        className={`absolute w-4/5 top-0 h-10 flex items-center justify-center right-0 cursor-pointer bg-[rgba(255,255,255,0.8)] px-5 ${
                          data.colorSecundario ? "flex" : "hidden"
                        }`}
                      >
                        {data.colorSecundario ? data.colorSecundario : ""}
                      </label>
                      <input
                        type="color"
                        name="colorSecundario"
                        id="colorSecundario"
                        value={data.colorSecundario || "#ffffff"} // Usa #ffffff si no hay color seleccionado
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            colorSecundario: e.target.value, // Actualiza el color seleccionado
                          }))
                        }
                        className="w-full border-none h-11 border rounded mb-4 btn-secundario !normal-case"
                      />
                    </div>
                  </div>

                  {/* color Terciario */}
                  <div className="col-span-1">
                    <label htmlFor="colorTerciario" className="text-[14px]">
                      Color Terciario
                    </label>
                    <div className="relative flex items-center justify-center mb-4">
                      <label
                        htmlFor="colorTerciario"
                        className={`absolute w-4/5 top-0 h-10 flex items-center justify-center right-0 cursor-pointer bg-[rgba(255,255,255,0.8)] px-5 ${
                          data.colorTerciario ? "flex" : "hidden"
                        }`}
                      >
                        {data.colorTerciario ? data.colorTerciario : ""}
                      </label>
                      <input
                        type="color"
                        name="colorTerciario"
                        id="colorTerciario"
                        value={data.colorTerciario || "#ffffff"} // Usa #ffffff si no hay color seleccionado
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            colorTerciario: e.target.value, // Actualiza el color seleccionado
                          }))
                        }
                        className="w-full border-none h-11 border btn-secundario !normal-case"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-4 grid-cols-4 grid gap-x-4 my-3">
                  <div className="col-span-2">
                    <h2 className="font-bold">Header</h2>
                  </div>
                  <div className="col-span-2">
                    <h2 className="font-bold">Barra lateral</h2>
                  </div>
                </div>

                {/* color HeaderTextos */}
                <div className="col-span-1">
                  <label className="text-[14px]">Color Textos </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="HeaderColorTextos"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.HeaderColorTextos ? "flex" : "hidden"
                      }`}
                    >
                      {data.HeaderColorTextos ? data.HeaderColorTextos : ""}
                    </label>
                    <input
                      type="color"
                      id="HeaderColorTextos"
                      name="HeaderColorTextos"
                      value={data.HeaderColorTextos || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          HeaderColorTextos: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color HeaderIcons */}
                <div className="col-span-1">
                  <label htmlFor="HeaderColorIcons" className="text-[14px]">
                    Color Icons
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="HeaderColorIcons"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.HeaderColorIcons ? "flex" : "hidden"
                      }`}
                    >
                      {data.HeaderColorIcons ? data.HeaderColorIcons : ""}
                    </label>
                    <input
                      type="color"
                      name="HeaderColorIcons"
                      id="HeaderColorIcons"
                      value={data.HeaderColorIcons || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          HeaderColorIcons: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color navColorIcon */}
                <div className="col-span-1">
                  <label htmlFor="navColorIcon" className="text-[14px]">
                    Color icono
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="navColorIcon"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.navColorIcon ? "flex" : "hidden"
                      }`}
                    >
                      {data.navColorIcon ? data.navColorIcon : ""}
                    </label>
                    <input
                      type="color"
                      name="navColorIcon"
                      id="navColorIcon"
                      value={data.navColorIcon || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          navColorIcon: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color navColorFondoIcon */}
                <div className="col-span-1">
                  <label htmlFor="navColorFondoIcon" className="text-[14px]">
                    Color fondo icono
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="navColorFondoIcon"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.navColorFondoIcon ? "flex" : "hidden"
                      }`}
                    >
                      {data.navColorFondoIcon ? data.navColorFondoIcon : ""}
                    </label>
                    <input
                      type="color"
                      name="navColorFondoIcon"
                      id="navColorFondoIcon"
                      value={data.navColorFondoIcon || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          navColorFondoIcon: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                <div className="col-span-4 grid-cols-4 grid gap-x-4 my-3">
                  <div className="col-span-2">
                    <h2 className="font-bold">Botón primario</h2>
                  </div>
                  <div className="col-span-2">
                    <h2 className="font-bold">Botón secundario</h2>
                  </div>
                </div>

                {/* color btnPrimarioColor */}
                <div className="col-span-1">
                  <label htmlFor="btnPrimarioColor" className="text-[14px]">
                    Color fondo{" "}
                    <span>
                      {data.btnPrimarioColor ? data.btnPrimarioColor : ""}
                    </span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="btnPrimarioColor"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.btnPrimarioColor ? "flex" : "hidden"
                      }`}
                    >
                      {data.btnPrimarioColor ? data.btnPrimarioColor : ""}
                    </label>
                    <input
                      type="color"
                      name="btnPrimarioColor"
                      id="btnPrimarioColor"
                      value={data.btnPrimarioColor || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          btnPrimarioColor: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color btnPrimarioColorTexto */}
                <div className="col-span-1">
                  <label
                    htmlFor="btnPrimarioColorTexto"
                    className="text-[14px]"
                  >
                    Color Texto
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="btnPrimarioColorTexto"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.btnPrimarioColorTexto ? "flex" : "hidden"
                      }`}
                    >
                      {data.btnPrimarioColorTexto
                        ? data.btnPrimarioColorTexto
                        : ""}
                    </label>
                    <input
                      type="color"
                      name="btnPrimarioColorTexto"
                      id="btnPrimarioColorTexto"
                      value={data.btnPrimarioColorTexto || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          btnPrimarioColorTexto: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color btnSecundarioColor */}
                <div className="col-span-1">
                  <label htmlFor="btnSecundarioColor" className="text-[14px]">
                    Color fondo{" "}
                    <span>
                      {data.btnSecundarioColor ? data.btnSecundarioColor : ""}
                    </span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="btnSecundarioColor"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.btnSecundarioColor ? "flex" : "hidden"
                      }`}
                    >
                      {data.btnSecundarioColor ? data.btnSecundarioColor : ""}
                    </label>
                    <input
                      type="color"
                      name="btnSecundarioColor"
                      id="btnSecundarioColor"
                      value={data.btnSecundarioColor || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          btnSecundarioColor: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* color btnSecundarioColorTexto */}
                <div className="col-span-1">
                  <label
                    htmlFor="btnSecundarioColorTexto"
                    className="text-[14px]"
                  >
                    Color Texto{" "}
                    <span>
                      {data.btnSecundarioColorTexto
                        ? data.btnSecundarioColorTexto
                        : ""}
                    </span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <label
                      htmlFor="btnSecundarioColorTexto"
                      className={`absolute w-4/6 top-0 flex items-center right-0 h-full cursor-pointer bg-[rgba(255,255,255,0.7)] px-5 ${
                        data.btnSecundarioColorTexto ? "flex" : "hidden"
                      }`}
                    >
                      {data.btnSecundarioColorTexto
                        ? data.btnSecundarioColorTexto
                        : ""}
                    </label>
                    <input
                      type="color"
                      name="btnSecundarioColorTexto"
                      id="btnSecundarioColorTexto"
                      value={data.btnSecundarioColorTexto || "#ffffff"}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          btnSecundarioColorTexto: e.target.value,
                        }))
                      }
                      className="w-full border-none h-11 border rounded btn-secundario !normal-case"
                    />
                  </div>
                </div>

                {/* Navegación entre pasos */}
                <div className="col-span-4 flex justify-end gap-4 mt-8">
                  <button
                    onClick={handleCancel}
                    className="btn btn-secundario px-4 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={editing ? handleUpdate : handleCreate}
                    className="btn btn-principal px-4 py-2"
                  >
                    {editing ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

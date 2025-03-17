import { useState, useRef, useEffect } from "react";
import arrowDown from "/assets/svg/arrow-down.svg";
import "./layout.css";
import Nav from "../nav-lateral/nav";
import ContainerCards from "../Home/Cards-home/cards";
import Table from "../Home/table/table";
import { useMsal } from "@azure/msal-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Slide from "../slide/slide";
import ListadoEncuestas from "../Listado-encuestas/Listado-encuestas";
import FormEncuestas from "../PlantillasEncuestas/PlantillaEncuestas";
import CreatePlantilla from "../PlantillasEncuestas/CreatePlantillasForm/createPlantilla";
import AdministrarPlantillas from "../PlantillasEncuestas/administrarPlantillas/administrarPlantillas";

// rutas
import LiveConversations from "../Live-Conversations/Live-Conversations";
import CrearConversacion from "../Live-Conversations/Crear-conversacion/Crear";
import InformationEmpresas from "../Information-management/empresas/empresa";
import InformationEmpleado from "../Information-management/empleados/empleados";
import InformationDepartamento from "../Information-management/departamentos/informacion-departamentos";
import OtrosCampos from "../Information-management/otrosCampos/informacionOtrosCampos";
import OrganizationalNetworkAnalysis from "../Organizational-Network-Analysis/Organizational";
import {
  IconBell,
  IconSearch,
  IconSettings,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import EditarPlantilla from "../PlantillasEncuestas/editarPlantillasForm/[editarId]";
import EditarConversation from "../Live-Conversations/editConversation/[editarId]";
import RegistroDashboard from "../settings/Registro-dashboard/Registro-dashboard";
import RegistroReporte from "../settings/Registrar-reporte/Registro-reporte";
import Managecompany from "../settings/administrar-compañias/administrar-compañia";
import ManageUsers from "../settings/Administrar-usuarios/administrar-usuarios";
import ManageRol from "../settings/Administrar-roles/administrar-roles";
import Login from "../../login/login";
import SearchModal from "../searchModal/search";

export default function LayoutPrincipal() {
  const [selectedOption, setSelectedOption] = useState("People Intelligence");
  const [selectedValue, setSelectedValue] = useState("Compañia");
  const [selectedColor, setSelectedColor] = useState(
    "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)"
  );
  const [selectedColorSecundario, setSelectedColorSecundario] =
    useState("#1D70B7");
  // const [selectedColorText, setSelectedColorText] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColorTerciario, setSelectedColorTerciario] = useState("");
  const [selectedHeaderColorTextos, setSelectedHeaderColorTextos] =
    useState("");
  const [selectedHeaderColorIcons, setSelectedHeaderColorIcons] = useState("");
  const [selectedNavColorIcon, setSelectedNavColorIcon] = useState("");
  const [selectedNavColorFondoIcon, setSelectedNavColorFondoIcon] =
    useState("");
  const [selectedBtnPrimarioColor, setSelectedBtnPrimarioColor] = useState("");
  const [selectedBtnPrimarioColorTexto, setSelectedBtnPrimarioColorTexto] =
    useState("");
  const [selectedBtnSecundarioColor, setSelectedBtnSecundarioColor] =
    useState("");
  const [selectedBtnSecundarioColorTexto, setSelectedBtnSecundarioColorTexto] =
    useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [settingsModal, setSettingsModal] = useState(false);
  // Extraemos la instancia de MSAL y sus propiedades
  const { instance, accounts, inProgress } = useMsal();
  // manejo de el icono de la empresa dashboard principal
  const IconoPeople = "/assets/img/people-icon.jpg";

  const dataSearch = [
    {
      nombre: "Dashboard bancolombia 2024",
      estado: "activo",
      categoria: "Dashboard",
      img: "/assets/img/img-ej2.png",
    },
    {
      nombre: "Dashboard bancolombia 2023",
      estado: "inactivo",
      categoria: "Dashboard",
      img: "/assets/img/img-ej.png",
    },
    {
      nombre: "Encuesta de satisfacción",
      estado: "inactivo",
      categoria: "Encuestas",
      img: "/assets/img/img-ej2.png",
    },
    {
      nombre: "Conversaciones con clientes",
      estado: "activo",
      categoria: "Conversaciones",
      img: "/assets/img/img-ej.png",
    },
    {
      nombre: "Encuesta de satisfacción",
      estado: "inactivo",
      categoria: "Encuestas",
      img: "/assets/img/img-ej2.png",
    },
    {
      nombre: "Conversaciones con clientes",
      estado: "activo",
      categoria: "Conversaciones",
      img: "/assets/img/img-ej.png",
    },
    {
      nombre: "Encuesta de satisfacción",
      estado: "inactivo",
      categoria: "Encuestas",
      img: "/assets/img/img-ej2.png",
    },
    {
      nombre: "Conversaciones con clientes",
      estado: "activo",
      categoria: "Conversaciones",
      img: "/assets/img/img-ej.png",
    },
  ];

  const [OpenSearch, setOpenSearch] = useState("");
  const handleSearch = () => {
    setOpenSearch(true); // Abrir el modal
  };

  const handleCloseSearch = () => {
    setOpenSearch(false); // Cerrar el modal
  };

  const user = {
    nombre: "user",
    img: "",
  };

  const options = [
    {
      value: "Compañia",
      text: "People Intelligence",
      logo: "/assets/img/logo.jpg",
      icon: "/assets/img/people-icon.jpg",
      color_principal:
        "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)",
      color_secundario: "#1D70B7",
      colorTerciario: "#024147",
      HeaderColorTextos: "#333",
      HeaderColorIcons: "#1D70B7",
      navColorIcon: "#fff",
      navColorFondoIcon: "#1D70B7",
      btnPrimarioColor: "#1D70B7",
      btnPrimarioColorTexto: "#fff",
      btnSecundarioColor: "#fff",
      btnSecundarioColorTexto: "#000",
    },
    {
      value: "Compañia",
      text: "Allianz",
      logo: "/assets/img/allianz-logo.jpg",
      icon: "/assets/img/allianz-icon.jpg",
      color_principal: "#004A93",
      color_secundario: "#1D70B7",
      colorTerciario: "#024147",
      HeaderColorTextos: "#fff",
      HeaderColorIcons: "#999",
      navColorIcon: "#fff",
      navColorFondoIcon: "#004A93",
      btnPrimarioColor: "#004A93",
      btnPrimarioColorTexto: "#fff",
      btnSecundarioColor: "#fff",
      btnSecundarioColorTexto: "#000",
    },
    {
      value: "Compañia",
      text: "Davivienda",
      logo: "/assets/img/davivienda-logo.jpg",
      icon: "/assets/img/davivienda-icon.jpg",
      color_principal: "#E00208",
      color_secundario: "#232121",
      colorTerciario: "#024147",
      HeaderColorTextos: "#fff",
      HeaderColorIcons: "#ccc",
      navColorIcon: "#fff",
      navColorFondoIcon: "#E00208",
      btnPrimarioColor: "#E00208",
      btnPrimarioColorTexto: "#fff",
      btnSecundarioColor: "#232121",
      btnSecundarioColorTexto: "#fff",
    },
    {
      value: "Compañia",
      text: "Bancolombia",
      logo: "/assets/img/bancolombia-logo.jpg",
      icon: "/assets/img/bancolombia-icon.jpg",
      color_principal: "#2C2A29",
      color_secundario: "#FFD900",
      colorTerciario: "#024147",
      HeaderColorTextos: "#fff",
      HeaderColorIcons: "#777",
      navColorIcon: "#FFD900",
      navColorFondoIcon: "#000",
      btnPrimarioColor: "#2C2A29",
      btnPrimarioColorTexto: "#fff",
      btnSecundarioColor: "#fff",
      btnSecundarioColorTexto: "#000",
    },
  ];

  useEffect(() => {
    const initialOption = options.find(
      (option) => option.text === selectedOption
    );
    if (initialOption) {
      setSelectedColor(initialOption.color_principal);
      setSelectedImg(initialOption.logo);
      setSelectedColorSecundario(initialOption.color_secundario);
      // setSelectedColorText(initialOption.color_texto);
      setSelectedIcon(initialOption.icon);
      setSelectedColorTerciario(initialOption.colorTerciario);
      setSelectedHeaderColorTextos(initialOption.HeaderColorTextos);
      setSelectedHeaderColorIcons(initialOption.HeaderColorIcons);
      setSelectedNavColorIcon(initialOption.navColorIcon);
      setSelectedNavColorFondoIcon(initialOption.navColorFondoIcon);
      setSelectedBtnPrimarioColor(initialOption.btnPrimarioColor);
      setSelectedBtnPrimarioColorTexto(initialOption.btnPrimarioColorTexto);
      setSelectedBtnSecundarioColor(initialOption.btnSecundarioColor);
      setSelectedBtnSecundarioColorTexto(initialOption.btnSecundarioColorTexto);
    }
  }, [selectedOption]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.text);
    setSelectedValue(option.value);
    setSelectedColor(option.color_principal);
    setSelectedColorSecundario(option.color_secundario);
    setSelectedImg(option.logo);
    setSelectedIcon(option.icon);
    setSelectedColorTerciario(option.colorTerciario);
    setSelectedHeaderColorTextos(option.HeaderColorTextos);
    setSelectedHeaderColorIcons(option.HeaderColorIcons);
    setSelectedNavColorIcon(option.navColorIcon);
    setSelectedNavColorFondoIcon(option.navColorFondoIcon);
    setSelectedBtnPrimarioColor(option.btnPrimarioColor);
    setSelectedBtnPrimarioColorTexto(option.btnPrimarioColorTexto);
    setSelectedBtnSecundarioColor(option.btnSecundarioColor);
    setSelectedBtnSecundarioColorTexto(option.btnSecundarioColorTexto);

    // Guardar la opción seleccionada en localStorage
    localStorage.setItem("selectedOption", option.text);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // señal de nav
  useEffect(() => {
    const handleNavSignal = (event) => {
      console.log(event.detail.message);
    };
    window.addEventListener("navSignal", handleNavSignal);
    return () => {
      window.removeEventListener("navSignal", handleNavSignal);
    };
  }, []);

  const ruta = location.pathname.toLowerCase(); // Convertimos la ruta a minúsculas para evitar problemas de comparación.
  const id = ruta.split("/").pop();

  const getTituloPagina = (ruta) => {
    if (ruta === "/") return "Dashboard";
    if (ruta === "/dashboard") return "Dashboard";
    if (ruta === "/employeejourney") return "Employee Journey";
    if (ruta == "/employeejourney/plantillaencuestas")
      return "Plantillas de Encuestas";
    if (ruta == "/employeejourney/crear") return "Crear Plantilla";
    if (ruta == "/employeejourney/administrarencuestas")
      return "Administrar Encuestas";
    if (ruta == "/live-conversations") return "Dynamic Live Conversations";
    if (ruta == "/crear-conversacion") return "Crear conversación";
    if (ruta == "/informationmanagement/empresas") return "Empresas";
    if (ruta == "/informationmanagement/empleados") return "Empleados";
    if (ruta == "/informationmanagement/departamentos") return "Departamentos";
    if (ruta == "/informationmanagement/otros-campos") return "Otros campos";
    if (ruta == "/advanced-analytics") return "Advanced Analytics";
    if (ruta == `/employeejourney/editar/${id}`) return "Editar Encuesta";
    if (ruta == `/live-conversations/editar/${id}`)
      return "Dynamic Live Conversations";
    return "";
  };

  const [tituloPagina, setTituloPagina] = useState(getTituloPagina(ruta));

  // recuperar sesion
  useEffect(() => {
    // Recuperar la opción seleccionada al cargar la página
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  // log out
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);
  
  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });

  };

  // edit user
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData({
      name: "",
      image: null,
    });
  };

  const handleImageChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleNameChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Datos:", data);
    handleClose();
    setData({
      name: "",
      image: null,
    });
  };

  return (
    <section>
      <section
        className="h-[100vh] overflow-hidden"
        style={{
          "--color-principal": `${selectedColor}`,
          "--color-secundario": `${selectedColorSecundario}`,
          // "--color-texto": `${selectedColorText}`,
          "--color-terciario": `${selectedColorTerciario}`,
          "--header-color-textos": `${selectedHeaderColorTextos}`,
          "--header-color-icons": `${selectedHeaderColorIcons}`,
          "--nav-color-icon": `${selectedNavColorIcon}`,
          "--nav-color-fondo-icon": `${selectedNavColorFondoIcon}`,
          "--btn-primario-color": `${selectedBtnPrimarioColor}`,
          "--btn-primario-color-texto": `${selectedBtnPrimarioColorTexto}`,
          "--btn-secundario-color": `${selectedBtnSecundarioColor}`,
          "--btn-secundario-color-texto": `${selectedBtnSecundarioColorTexto}`,
        }}
      >
        <header
          className="flex justify-between encabezado py-4 px-7 items-center transition-all duration-300"
          style={{ background: selectedColor }}
        >
          <div className="flex items-center">
            <div
              className={`bg-white rounded-b-xl p-2 py-1 border-x-[#eee] border border-b-[#eee] border-t-0 w-[230px] px-4 flex items-center justify-center pt-11 -mt-11 `}
            >
              <img
                className="h-[50px] transition-all duration-300  rounded-b-xl object-contain"
                src={selectedImg}
                alt="Logo"
              />{" "}
            </div>
            <div className="flex ps-5 items-center justify-center ml-6 border-[#919090] border-s-2 text-xl font-bold">
              <h2 style={{ color: `${selectedHeaderColorTextos}` }}>
                {options.color_texto} {tituloPagina}
              </h2>
            </div>
          </div>
          <div className="flex justify-end" ref={selectRef}>
            <div className="custom-select-container">
              <div
                className="custom-select-selected rounded-full w-[300px] transition-all duration-300" // Transición suave
                onClick={toggleDropdown}
              >
                <div className="flex items-center">
                  <img
                    className="bg-[#F1F2F6] w-[42px] h-[42px] p-2 me-3 rounded-full"
                    src={selectedIcon || IconoPeople}
                    alt=""
                  />
                  <div>
                    <p className="text-[14px]">{selectedValue}</p>
                    <p className="text-[16px]">{selectedOption}</p>
                  </div>
                </div>
                <img
                  src={arrowDown}
                  alt="Arrow Icon"
                  className={`arrow-icon ${isOpen ? "open" : ""}`}
                />
              </div>
              <ul
                className={`custom-select-items w-[300px] p-5 transition-all duration-300 ${
                  isOpen ? "open" : "hidden"
                }`}
              >
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`flex items-center flex-row p-1 rounded transition-all duration-300 ${
                      selectedOption === option.text ? "selected p-1" : ""
                    }`}
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-full p-2 bg-[#F1F2F6]"
                      src={option.icon || "/assets/img/people-icon.jpg"}
                      alt=""
                    />
                    <div className="w-[300px] ps-3">
                      <p>{option.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center flex-wrap">
              <IconSearch
                color={selectedHeaderColorIcons}
                onClick={handleSearch}
                className={`bg-[#F1F2F6] w-[55px] h-[55px] p-3 mx-3 rounded-full`}
              />
              <SearchModal
                open={OpenSearch}
                onClose={handleCloseSearch}
                dataSearch={dataSearch}
              />
              {/* <IconBell
                color={selectedHeaderColorIcons}
                className={`bg-[#F1F2F6] w-[55px] h-[55px] p-3 mx-3 rounded-full`}
              /> */}
              <div className="relative group">
                <IconSettings
                  color={selectedHeaderColorIcons}
                  className="bg-[#F1F2F6] w-[55px] h-[55px] p-3 mx-3 rounded-full cursor-pointer"
                />
                <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-opacity duration-300 absolute pt-4 w-max left-[50%] -translate-x-[50%] z-[99]">
                  <ul className="rounded-[15px] bg-white p-4 top-[100%] shadow row-after">
                    <Link to="/registrar-dashboard">
                      <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                        Registrar dashboard
                      </li>
                    </Link>
                    <Link to="/registrar-reporte">
                      <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                        Registrar reporte
                      </li>
                    </Link>
                    <Link to={"/administrar-compañia"}>
                      <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                        Administrar compañía
                      </li>
                    </Link>
                    <Link to={"/administrar-usuario"}>
                      <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                        Administrar usuario
                      </li>
                    </Link>
                    <Link to={"/administrar-roles"}>
                      <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                        Administrar rol
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-[#F1F2F6] w-[55px] h-[55px] ms-3 rounded-full overflow-hidden">
                  {user.img ? (
                    <img
                      className="w-full h-full object-cover"
                      src={user.img}
                      alt="perfil de usuario"
                    />
                  ) : (
                    <IconUserFilled className="w-full h-full text-[#ccc] p-3" />
                  )}
                </div>

                <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-opacity duration-300 absolute pt-4 w-max left-[50%] -translate-x-[50%] z-[99]">
                  <ul className="rounded-[15px] bg-white p-4 top-[100%] shadow row-after">
                    <li
                      className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleOpen}
                    >
                      Ver perfil
                    </li>
                    <li
                      className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="flex">
          <Nav
            colorOptions={{
              selectedOption,
              selectedValue,
              selectedColor,
              selectedImg,
              selectedColorSecundario,
            }}
            titulo={setTituloPagina}
          ></Nav>
          <section className="mt-4 w-full h-[calc(100vh-100px)] overflow-auto">
            <Routes>
              <Route
                path="/Dashboard"
                element={
                  <>
                    <ContainerCards />
                    <Table titulo={setTituloPagina} />
                  </>
                }
              />
              <Route
                path="/employeejourney"
                element={
                  <>
                    <Slide titulo={setTituloPagina} />
                    <ListadoEncuestas />
                  </>
                }
              />
              <Route
                path="/employeejourney/plantillaencuestas"
                element={<FormEncuestas titulo={setTituloPagina} />}
              />
              <Route
                path="/employeejourney/crear"
                element={<CreatePlantilla titulo={setTituloPagina} />}
              />
              <Route
                path="/employeejourney/AdministrarEncuestas"
                element={<AdministrarPlantillas titulo={setTituloPagina} />}
              />
              <Route
                path="/live-conversations"
                element={<LiveConversations titulo={setTituloPagina} />}
              />
              <Route
                path="/crear-conversacion"
                element={
                  <CrearConversacion
                    titulo={setTituloPagina}
                    logoEmpresas={selectedImg}
                  />
                }
              />
              <Route
                path="/informationmanagement/empresas"
                element={<InformationEmpresas titulo={setTituloPagina} />}
              />
              <Route
                path="/informationmanagement/empleados"
                element={<InformationEmpleado titulo={setTituloPagina} />}
              />
              <Route
                path="/informationmanagement/departamentos"
                element={<InformationDepartamento titulo={setTituloPagina} />}
              />
              <Route
                path="/informationmanagement/otros-campos"
                element={<OtrosCampos titulo={setTituloPagina} />}
              />
              <Route
                path="/network-analysis"
                element={
                  <OrganizationalNetworkAnalysis titulo={setTituloPagina} />
                }
              />
              <Route
                path="/employeejourney/editar/:id"
                element={<EditarPlantilla titulo={setTituloPagina} />}
              />
              <Route
                path="/live-conversations/editar/:id"
                element={
                  <EditarConversation
                    titulo={setTituloPagina}
                    logoEmpresas={selectedImg}
                  />
                }
              />
              <Route path="/advanced-analytics" element={<></>} />
              <Route
                path="/registrar-dashboard"
                element={<RegistroDashboard />}
              />
              <Route path="/registrar-reporte" element={<RegistroReporte />} />
              <Route path="/administrar-compañia" element={<Managecompany />} />
              <Route path="/administrar-usuario" element={<ManageUsers />} />
              <Route path="/administrar-roles" element={<ManageRol />} />
            </Routes>
          </section>
        </section>
      </section>

      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[99]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Editar Perfil
            </h2>

            {/* Vista previa de la imagen */}
            <div className="flex justify-center relative flex-col">
              {data.image || "/default-profile.png" ? (
                <img
                  src={
                    data.image
                      ? URL.createObjectURL(data.image)
                      : "/default-profile.png"
                  }
                  alt="Vista previa de perfil"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              ) : null}

              {/* Botón para cambiar imagen */}
              <label
                htmlFor="image-upload"
                className={`btn btn-principal absolute w-32 h-32 mx-auto left-[50%] -translate-x-[50%] border-dashed rounded-full border-2 min-w-32 flex items-center justify-center text-center text-sm cursor-pointer ${
                  data.image
                    ? "bg-transparent text-transparent border-none"
                    : "bg-white"
                }`}
              >
                <IconUserFilled
                  className={`w-full h-full text-[#ccc] ${
                    data.image ? "hidden" : "block"
                  }`}
                />
              </label>
            </div>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label className="block text-sm font-medium text-gray-700 mt-6">
              Nombre
            </label>
            <input
              type="text"
              value={data.name}
              onChange={handleNameChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              placeholder="Introduce tu nombre"
            />

            <div className="flex justify-end mt-11 space-x-4">
              <button
                className="btn btn-secundario !min-w-max px-8"
                onClick={handleClose}
                style={{
                  background: `${selectedBtnSecundarioColor}`,
                  color: `${selectedBtnSecundarioColorTexto}`,
                  border: `1px solid ${selectedBtnSecundarioColorTexto}`,
                }}
              >
                Cancelar
              </button>
              <button
                className={`btn btn-principal !min-w-max px-8`}
                style={{
                  background: `${selectedBtnPrimarioColor}`,
                  color: `${selectedBtnPrimarioColorTexto}`,
                }}
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

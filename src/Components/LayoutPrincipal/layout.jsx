import { useState, useRef, useEffect } from "react";
import search from "../../assets/svg/icon-search.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";
import "./layout.css";
import settings from "../../assets/svg/settings.svg";
import notifications from "../../assets/svg/bell.svg";
import user from "../../assets/img/user.jpg";
import Nav from "../nav-lateral/nav";
import ContainerCards from "../Home/Cards-home/cards";
import Table from "../Home/table/table";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Slide from "../slide/slide";
import ListadoEncuestas from "../Listado-encuestas/Listado-encuestas";
import FormEncuestas from "../PlantillasEncuestas/PlantillaEncuestas";
import CreatePlantilla from "../PlantillasEncuestas/CreatePlantillasForm/createPlantilla";
import AdministrarPlantillas from "../PlantillasEncuestas/administrarPlantillas/administrarPlantillas";

// logos
import Logo from "../../assets/img/logo.jpg";
import daviviendaIcon from "../../assets/img/davivienda-icon.jpg";
import davivienda from "../../assets/img/davivienda-logo.jpg";
import peopleIcon from "../../assets/img/people-icon.jpg";
import allianz from "../../assets/img/allianz-logo.jpg";
import alianzIcon from "../../assets/img/allianz-icon.jpg";
import bancolombia from "../../assets/img/bancolombia-logo.jpg";
import bancolombiaIcon from "../../assets/img/bancolombia-icon.jpg";
import LiveConversations from "../Live-Conversations/Live-Conversations";
import CrearConversacion from "../Live-Conversations/Crear-conversacion/Crear";
import InformationEmpresas from "../Information-management/empresas/empresa";
import InformationEmpleado from "../Information-management/empleados/empleados";
import InformationDepartamento from "../Information-management/departamentos/departamentos";

export default function LayoutPrincipal() {
  const [selectedOption, setSelectedOption] = useState("People Intelligence");
  const [selectedValue, setSelectedValue] = useState("Compañia");
  const [selectedColor, setSelectedColor] = useState(
    "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)"
  );
  const [selectedColorSecundario, setSelectedColorSecundario] =
    useState("#1D70B7");
  const [selectedColorText, setSelectedColorText] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSearch = () => {};

  const options = [
    {
      value: "Compañia",
      text: "People Intelligence",
      logo: Logo,
      icon: peopleIcon,
      color_principal:
        "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)",
      color_secundario: "#1D70B7",
      color_texto: "#000",
    },
    {
      value: "Compañia",
      text: "Allianz",
      logo: allianz,
      icon: alianzIcon,
      color_principal: "#004A93",
      color_secundario: "#8C8C8C",
      color_texto: "#fff",
    },
    {
      value: "Compañia",
      text: "Davivienda",
      logo: davivienda,
      icon: daviviendaIcon,
      color_principal: "#E00208",
      color_secundario: "#232121",
      color_texto: "#fff",
    },
    {
      value: "Compañia",
      text: "Bancolombia",
      logo: bancolombia,
      icon: bancolombiaIcon,
      color_principal: "#2C2A29",
      color_secundario: "#FFD900",
      color_texto: "#fff",
    },
  ];

  useEffect(() => {
    const initialOption = options.find(
      (option) => option.text === selectedOption
    );
    if (initialOption) {
      setSelectedColor(initialOption.color_principal);
      setSelectedImg(initialOption.logo);
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
    setSelectedColorText(option.color_texto);
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

    return ""; // Valor por defecto si no coincide con ninguna ruta
  };

  const [tituloPagina, setTituloPagina] = useState(getTituloPagina(ruta));

  return (
    <Router>
      <section className="h-[100vh] overflow-hidden">
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
              <h2 style={{ color: `${selectedColorText}` }}>
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
                    src={selectedIcon || peopleIcon}
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
                      src={option.icon || peopleIcon}
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
              <img
                className="bg-[#F1F2F6] w-[55px] h-[55px] p-3 mx-3 rounded-full text-[#1D70B7]"
                onClick={handleSearch}
                src={search}
                alt="Search Icon"
              />
              <img
                className="bg-[#F1F2F6] w-[55px] h-[55px] p-3 mx-3 rounded-full text-[#1D70B7]"
                src={notifications}
                alt=""
              />
              <img
                className="bg-[#F1F2F6] w-[55px] h-[55px] p-3 me-3 rounded-full"
                src={settings}
                alt=""
              />
              <img
                className="bg-[#F1F2F6] w-[55px] h-[55px] ms-3 rounded-full"
                src={user}
                alt=""
              />
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
                path="/"
                element={
                  <>
                    <ContainerCards />
                    <Table />
                  </>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <>
                    <ContainerCards />
                    <Table />
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
                element={
                  <>
                    <FormEncuestas titulo={setTituloPagina}></FormEncuestas>
                  </>
                }
              />
              <Route
                path="/employeejourney/crear"
                element={
                  <>
                    <CreatePlantilla titulo={setTituloPagina}></CreatePlantilla>
                  </>
                }
              />
              <Route
                path="/employeejourney/AdministrarEncuestas"
                element={
                  <>
                    <AdministrarPlantillas
                      titulo={setTituloPagina}
                    ></AdministrarPlantillas>
                  </>
                }
              />
              <Route
                path="/live-conversations"
                element={
                  <>
                    <LiveConversations titulo={setTituloPagina} />
                  </>
                }
              />
              <Route
                path="/crear-conversacion"
                element={
                  <>
                    <CrearConversacion
                      titulo={setTituloPagina}
                      logoEmpresas={selectedImg}
                    />
                  </>
                }
              />
              <Route
                path="/informationmanagement/empresas"
                element={<InformationEmpresas />}
                titulo={setTituloPagina}
              />
              <Route
                path="/informationmanagement/empleados"
                element={<InformationEmpleado />}
                titulo={setTituloPagina}
              />
                 <Route
                path="/informationmanagement/departamentos"
                element={<InformationDepartamento />}
                titulo={setTituloPagina}
              />
            </Routes>
          </section>
        </section>
      </section>
    </Router>
  );
}

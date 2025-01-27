import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./nav.css";

import item from "../../assets/svg/icons-menu/item-1-black.svg";
import itemWhite from "../../assets/svg/icons-menu/item-1.svg";
import item2 from "../../assets/svg/icons-menu/item-2-black.svg";
import item2White from "../../assets/svg/icons-menu/item-2.svg";
import item3 from "../../assets/svg/icons-menu/item-3-black.svg";
import item3White from "../../assets/svg/icons-menu/item-3.svg";
import item4 from "../../assets/svg/icons-menu/item-4-black.svg";
import item4White from "../../assets/svg/icons-menu/item-4.svg";
import item5 from "../../assets/svg/icons-menu/item-5-black.svg";
import item5White from "../../assets/svg/icons-menu/item-5.svg";
import item6 from "../../assets/svg/icons-menu/item-6-black.svg";
import item6White from "../../assets/svg/icons-menu/item-6.svg";

export default function Nav({ colorOptions, titulo }) {
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
    if (ruta == "/crear-conversacion") return "Dynamic Live Conversations";

    return "";
  };

  const location1 = useLocation();

  const [activeLink, setActiveLink] = useState(getTituloPagina(ruta));

  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    setActiveLink(title);
    titulo(title); // Actualiza el título con el nombre del enlace clickeado
  };

  return (
    <nav
      className="nav"
      style={{
        background: colorOptions.selectedColor,
        color:
          colorOptions.selectedColor ===
          "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)"
            ? "black"
            : "white",
      }}
    >
      <Link
        to="/dashboard"
        className={`nav-item ${activeLink == "Dashboard"  ? "active" : ""}`}
        onClick={() => handleLinkClick("Dashboard")} // Pasas el título 'Dashboard' al hacer clic
      >
        <span
          className="icon mx-3 p-2"
          style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
        >
          <img
            src={activeLink == "Dashboard" ? itemWhite : item}
            alt="Dashboard Icon"
            style={{ fill: colorOptions.selectedColorSecundario }}
          />
        </span>
        <span className="nav-text">Dashboard</span>
      </Link>
      <Link
        to="/employeejourney"
        className={`nav-item ${
          activeLink == "Employee Journey" || activeLink == "Crear Plantilla"
            ? "active"
            : ""
        }`}
        onClick={() => handleLinkClick("Employee Journey")}
      >
        <span
          className="icon mx-3 p-2"
          style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
        >
          <img
            src={
              activeLink == "Employee Journey" ||
              activeLink == "Crear Plantilla"
                ? item2White
                : item2
            }
            alt="Employee Journey Icon"
            style={{ fill: colorOptions.selectedColorSecundario }}
          />
        </span>
        <span className="nav-text">Employee Journey</span>
      </Link>
      <Link
        to="/live-conversations"
        className={`nav-item ${
          activeLink == "Dynamic Live Conversations" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Dynamic Live Conversations")} // Pasas el título 'Dynamic Live Conversations'
      >
        <span
          className="icon mx-3 p-2"
          style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
        >
          <img
            src={
              activeLink == "Dynamic Live Conversations" ? item3White : item3
            }
            alt="Advanced Analytics Icon"
            style={{ fill: colorOptions.selectedColorSecundario }}
          />
        </span>
        <span className="nav-text">Dynamic Live Conversations</span>
      </Link>
      <Link
        to="/advanced-analytics"
        className={`nav-item cursor-default ${
          activeLink == "Advanced Analytics & Dashboards" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Advanced Analytics & Dashboards")} // Pasas el título 'Advanced Analytics & Dashboards'
      >
        <span
          className="icon mx-3 p-2"
          style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
        >
          <img
            src={item5}
            alt="Live Conversations Icon"
            style={{ fill: colorOptions.selectedColorSecundario }}
          />
        </span>
        <span className="nav-text">Advanced Analytics & Dashboards</span>
      </Link>
      <div className="relative group nav-item cursor-default flex-col w-full">
        <div className="flex items-center space-x-2 cursor-pointer w-full">
          <span
            className="icon mx-3 p-2"
            style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
          >
            <img
              src={item6}
              alt="Information Management Icon"
              style={{ fill: colorOptions.selectedColorSecundario }}
            />
          </span>
          <span className="nav-text">
            Information <br /> Management
          </span>
        </div>

        {/* Submenú con transición */}
        <ul className="relative mt-2 hidden opacity-0 group-hover:block group-hover:opacity-100 rounded-md transition-opacity duration-500 px-[50px] list-disc">
          <li className="my-3">
            <Link className="px-4 py-2 hover:bg-gray-400 w-full rounded" to="/informationmanagement/empresas"  onClick={() => handleLinkClick("Empresas")}>Empresas</Link>
          </li>
          <li className="my-3">
            <Link className="px-4 py-2 hover:bg-gray-400 w-full rounded" to="/informationmanagement/empleados">Empleados</Link>
          </li>
          <li className="my-3">
            <Link className="px-4 py-2 hover:bg-gray-400 w-full rounded" to="/informationmanagement/departamentos">Departamentos</Link>
          </li>
          <li className="my-3">
            <Link className="px-4 py-2 hover:bg-gray-400 w-full rounded" to="/informationmanagement/otros-campos">Otros campos</Link>
          </li>
        </ul>
      </div>

      <Link
        to="/network-analysis"
        className={`nav-item ${
          activeLink == "Organizational Network Analysis" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Organizational Network Analysis")} // Pasas el título 'Organizational Network Analysis'
      >
        <span
          className="icon mx-3 p-2"
          style={{ "--color-iconbg": colorOptions.selectedColorSecundario }}
        >
          <img
            src={item4}
            alt="Network Analysis Icon"
            style={{ fill: colorOptions.selectedColorSecundario }}
          />
        </span>
        <span className="nav-text">Organizational Network Analysis</span>
      </Link>
    </nav>
  );
}

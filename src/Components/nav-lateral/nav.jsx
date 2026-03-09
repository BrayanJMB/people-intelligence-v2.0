import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import "./nav.css";
import {
  IconAlignBoxBottomCenterFilled,
  IconChartAreaFilled,
  IconInfoHexagonFilled,
  IconLayoutDashboardFilled,
  IconMessageFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next'
import { useAuth } from "../../App";
export default function Nav({ colorOptions, titulo }) {
  const ruta = location.pathname.toLowerCase();
  const id = ruta.split("/").pop();
  const { accessToken, userRoles } = useAuth();
  const { t } = useTranslation('nav')
  const getTituloPagina = (ruta) => {
    if (ruta === "/" || ruta === "/dashboard") return t('dashboard')
    if (ruta === "/employeejourney") return t('employeeJourney')
    if (ruta === "/employeejourney/plantillaencuestas") return t('plantillasEncuestas')
    if (ruta === "/employeejourney/crear") return t('crearPlantilla')
    if (ruta === "/employeejourney/administrarencuestas") return t('administrarEncuestas')
    if (ruta === "/live-conversations") return t('liveConversations')
    if (ruta === "/crear-conversacion") return t('liveConversations')
    if (ruta === "/informationmanagement/empresas") return t('empresas')
    if (ruta === "/informationmanagement/empleados") return t('empleados')
    if (ruta === "/informationmanagement/departamentos") return t('departamentos')
    if (ruta === "/informationmanagement/otros-campos") return t('otrosCampos')
    if (ruta === "/network-analysis") return t('networkAnalysis')
    if (ruta === "/advanced-analytics") return t('advancedAnalytics')
    if (ruta === `/employeejourney/editar/${id}`) return t('editarEncuesta')
    if (ruta === `/live-conversations/editar/${id}`) return t('liveConversations')
    return ""
  }

  // Estado para almacenar el título de la página
  const [activeLink, setActiveLink] = useState(
    getTituloPagina(location.pathname)
  );

  // Actualizar el título y el estado activeLink cada vez que cambia la ruta
  useEffect(() => {
    const title = getTituloPagina(location.pathname);
    setActiveLink(title);
    titulo(title);
  }, [location.pathname, titulo]);

  // Manejador de clic para actualizar el título cuando se hace clic en un enlace
  const handleLinkClick = (title) => {
    setActiveLink(title);
    titulo(title);
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
        className={`nav-item ${activeLink == t('dashboard') ? "active" : ""}`}
        onClick={() => handleLinkClick('dashboard')}
      >
        <span className="icon mx-3 p-2">
          <IconLayoutDashboardFilled
            {...(activeLink == t('dashboard') ? {} : { color: "inherit" })}
            className={`${activeLink == t('dashboard') ? "iconActive" : ""}`}
          />
        </span>
        <span className="nav-text">{t('dashboard')}</span>
      </Link>
       {/* Se comentan estas secciones que aún no son ncesarioas
        <Link
          to="/employeejourney"
          className={`nav-item ${
            activeLink == "Employee Journey" ||
            activeLink == "Plantillas de Encuestas" ||
            activeLink == "Crear Plantilla" ||
            activeLink == "Editar Encuesta" ||
            activeLink == "Administrar Encuestas"
              ? "active"
              : ""
          }`}
          onClick={() => handleLinkClick("Employee Journey")}
        >
          <span className="icon mx-3 p-2">
            <IconAlignBoxBottomCenterFilled
              {...(activeLink === "Employee Journey" ||
              activeLink === "Plantillas de Encuestas" ||
              activeLink === "Crear Plantilla" ||
              activeLink == "Editar Encuesta" ||
              activeLink === "Administrar Encuestas"
                ? {}
                : { color: "inherit" })}
              className={`${
                activeLink == "Employee Journey" ||
                activeLink == "Plantillas de Encuestas" ||
                activeLink == "Editar Encuesta" ||
                activeLink == "Crear Plantilla" ||
                activeLink == "Administrar Encuestas"
                  ? "iconActive"
                  : ""
              }`}
            ></IconAlignBoxBottomCenterFilled>
          </span>
          <span className="nav-text">Employee Journey</span>
        </Link>
     
      <Link
        to="/live-conversations"
        className={`nav-item ${
          activeLink == "Dynamic Live Conversations" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Dynamic Live Conversations")}
      >
        <span className="icon mx-3 p-2">
          <IconMessageFilled
            {...(activeLink == "Dynamic Live Conversations"
              ? {}
              : { color: "inherit" })}
            className={`${
              activeLink == "Dynamic Live Conversations" ? "iconActive" : ""
            }`}
          ></IconMessageFilled>
        </span>
        <span className="nav-text">Dynamic Live Conversations</span>
      </Link>
      */}
      <Link
        to="/advanced-analytics"
        className={`nav-item ${activeLink == t('advancedAnalytics') ? "active" : ""}`}
        onClick={() => handleLinkClick('advancedAnalytics')}
      >
        <span className="icon mx-3 p-2">
          <IconChartAreaFilled
            {...(activeLink == t('advancedAnalytics') ? {} : { color: "inherit" })}
            className={`${activeLink == t('advancedAnalytics') ? "iconActive" : ""}`}
          />
        </span>
        <span className="nav-text">{t('advancedAnalytics')}</span>
      </Link>
      <div
        className={`relative group flex-col w-full nav-item cursor-default ${
          ["Empresas", "Empleados", "Departamentos", "Otros campos"].includes(
            activeLink
          )
            ? "active"
            : ""
        }`}
      >
        <div className="flex items-center space-x-2 cursor-pointer w-full">
          <span className="icon mx-3 p-2">
            <IconUserFilled
              {...([
                t('empresas'),
                //"Empleados",
                //"Departamentos",
                //"Otros campos",
              ].includes(activeLink)
                ? {}
                : { color: "inherit" })}
              className={`${
                [
                  t('empresas'),
                  //"Empleados",
                  //"Departamentos",
                  //"Otros campos",
                ].includes(activeLink)
                  ? "iconActive"
                  : ""
              }`}
            ></IconUserFilled>
          </span>
          <span className="nav-text">
            {t('informationManagement')}
          </span>
        </div>

        {/* Submenú con transición */}
        <ul className="relative mt-2 hidden opacity-0 group-hover:block group-hover:opacity-100 rounded-md transition-opacity duration-500 px-[50px] list-disc">
          <li className="my-3">
            <Link
              className={`px-4 py-2 hover:bg-gray-400 w-full rounded ${
                activeLink == t('empresas') ? "bg-[#ccc]" : ""
              }`}
              to="/informationmanagement/empresas"
              onClick={() => handleLinkClick('empresas')}
            >
              {t('empresas')}
            </Link>
          </li>
          {/*
          <li className="my-3">
            <Link
              className={`px-4 py-2 hover:bg-gray-400 w-full rounded ${
                activeLink == "Empleados" ? "bg-[#ccc]" : ""
              }`}
              to="/informationmanagement/empleados"
              onClick={() => handleLinkClick("Empleados")}
            >
              Empleados
            </Link>
          </li>
          <li className="my-3">
            <Link
              className={`px-4 py-2 hover:bg-gray-400 w-full rounded ${
                activeLink == "Departamentos" ? "bg-[#ccc]" : ""
              }`}
              to="/informationmanagement/departamentos"
              onClick={() => handleLinkClick("Departamentos")}
            >
              Departamentos
            </Link>
          </li>
          <li className="my-3">
            <Link
              className={`px-4 py-2 hover:bg-gray-400 w-full rounded ${
                activeLink == "Otros campos" ? "bg-[#ccc]" : ""
              }`}
              to="/informationmanagement/otros-campos"
              onClick={() => handleLinkClick("Otros campos")}
            >
              Otros campos
            </Link>
          </li>*/}
        </ul>
      </div>
        {/* 
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
          <IconInfoHexagonFilled
            className={`${
              activeLink == "Organizational Network Analysis"
                ? "iconActive"
                : ""
            }`}
            {...(activeLink == "Organizational Network Analysis"
              ? {}
              : { color: "inherit" })}
          ></IconInfoHexagonFilled>
        </span>
        <span className="nav-text">Organizational Network Analysis</span>
      </Link>*/}
    </nav>
  );
}

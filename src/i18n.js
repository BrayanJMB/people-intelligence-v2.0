import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esNav from "./locales/es/nav.json";
import enNav from "./locales/en/nav.json";
import esEmpresas from "./locales/es/companies.json";
import enEmpresas from "./locales/en/companies.json";
import esTable from "./locales/es/table.json";
import enTable from "./locales/en/table.json";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      nav: esNav,
      empresas: esEmpresas,
      table: esTable,
    },
    en: {
      nav: enNav,
      empresas: enEmpresas,
      table: enTable,
    },
  },
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

export default i18n;

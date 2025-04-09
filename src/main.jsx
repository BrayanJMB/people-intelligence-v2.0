import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { Provider } from 'react-redux';
import { store } from './app/store'; // ajusta la ruta si es diferente

const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </BrowserRouter>
);

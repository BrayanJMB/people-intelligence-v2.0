import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./App.css";
import LayoutPrincipal from "./Components/LayoutPrincipal/layout";
import Login from "./login/login";

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  if (location.pathname === "/" || !isAuthenticated) {
    return <Login />;
  }

  return <LayoutPrincipal />;
}

export default App;

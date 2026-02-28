import { useEffect, useState, createContext, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "./authConfig";
import LayoutPrincipal from "./Components/LayoutPrincipal/layout";
import api from "./api/api";
// ✅ Crear contexto global
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const { instance, accounts, inProgress } = useMsal();
  const [initialized, setInitialized] = useState(false);
  const [isHandlingRedirect, setIsHandlingRedirect] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [company, setCompany] = useState(null);
  const [checkingCompany, setCheckingCompany] = useState(true);

  // ✅ Establecer cuenta activa
  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // ✅ Procesar tokens y extraer roles
useEffect(() => {
  if (!initialized) return;
  setIsHandlingRedirect(true);

  instance
    .handleRedirectPromise()
    .then((redirectResponse) => {
      if (redirectResponse) {
        setAccessToken(redirectResponse.accessToken);
        extractRolesFromToken(redirectResponse.accessToken);
      }

      const account = instance.getActiveAccount();
      if (!account) return null; // 👈 por si acaso

      return instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
    })
    .then((tokenResponse) => {
      if (tokenResponse) {
        setAccessToken(tokenResponse.accessToken);
        extractRolesFromToken(tokenResponse.accessToken);
      }
    })
    .catch((error) => {
      console.error("Error en el flujo de tokens:", error);
    }).finally(() => {
      setIsHandlingRedirect(false); // 👈 liberar cuando termine
    });;
}, [initialized, instance, accounts]); // 👈 agregar accounts aquí

  // ✅ Inicializar MSAL
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        if (instance.initialize) {
          await instance.initialize();
        }
        setInitialized(true);
      } catch (error) {
        console.error("Error al inicializar MSAL:", error);
      }
    };
    initializeMsal();
  }, [instance]);

  // ✅ Si no hay sesión, forzar login
  useEffect(() => {
    if (
      initialized &&
      !isHandlingRedirect &&
      inProgress === InteractionStatus.None &&
      accounts.length === 0
    ) {
      instance.loginRedirect(loginRequest).catch((error) => {
        console.error("Error al hacer loginRedirect:", error);
      });
    }
  }, [initialized, inProgress, accounts, instance]);

  // ✅ Extraer roles desde el token
  function extractRolesFromToken(token) {
    try {
      const tokenParts = token.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));

      if (payload.extension_Rol) {
        setUserRoles(payload.extension_Rol.split(","));
      }
    } catch (error) {
      console.error("Error al extraer roles:", error);
    }
  }

  // ✅ Consultar compañía asignada
  useEffect(() => {
    const fetchCompany = async () => {
      if (!accessToken) return;
      console.log(accessToken)
      try {
        const res = await api.get("User/compania-asignada", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCompany(res); // ejemplo: { companyId, nombre }
      } catch (err) {
        if (err.response?.status === 403) {
          setCompany(null);
        }
        console.error("Error al consultar compañía:", err);
      } finally {
        setCheckingCompany(false);
      }
    };

    fetchCompany();
  }, [accessToken]);

  useEffect(() => {
    const activeAccount = instance.getActiveAccount();
    console.log(activeAccount)
    if (initialized && activeAccount && activeAccount.idTokenClaims?.newUser) {
      console.log("✅ Usuario nuevo detectado");
  
      api.post("User/notificar-nuevo-usuario", {
        email: activeAccount.username,
        name: "okay",
      });
    }
  }, [initialized, instance, accounts]);

  // ✅ Mostrar loader general
  if (
    !initialized ||
    isHandlingRedirect ||
    (inProgress !== InteractionStatus.None && accounts.length === 0)
  ) {
    return <div>Cargando autenticación...</div>;
  }

  // ✅ Esperando respuesta del backend
  if (checkingCompany) {
    return <div>Verificando compañía asignada...</div>;
  }

  // ❌ Sin compañía asignada
  if (accounts.length > 0 && company === null) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-xl font-bold">Acceso restringido</h2>
        <p>No tienes una compañía asignada. Contacta con el administrador.</p>
        <button
        onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        🔙 Cerrar sesión
      </button>
      </div>
    );
  }

  // ✅ Si todo está bien
  return (
    <AuthContext.Provider value={{ accessToken, userRoles, company }}>
      {accounts.length > 0 && <LayoutPrincipal />}
    </AuthContext.Provider>
  );
}

export default App;

import { useEffect, useState, createContext, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import LayoutPrincipal from "./Components/LayoutPrincipal/layout";
import api from "./api/api";
import { Toaster } from "react-hot-toast";
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

  // 1️⃣ Inicializar MSAL primero
  useEffect(() => {
    const init = async () => {
      try {
        if (instance.initialize) await instance.initialize();
        setInitialized(true);
      } catch (e) {
        console.error("Error inicializando MSAL:", e);
      }
    };
    init();
  }, [instance]);

  // 2️⃣ Manejar redirect y obtener token
  useEffect(() => {
    if (!initialized) return;

    setIsHandlingRedirect(true);

    instance
      .handleRedirectPromise()
      .then((redirectResponse) => {
        console.log("🔁 redirectResponse:", redirectResponse);

        if (redirectResponse?.accessToken) {
          setAccessToken(redirectResponse.accessToken);
          extractRolesFromToken(redirectResponse.accessToken);
          return null; // ya tenemos token, no seguir
        }

        // Si no viene de redirect, intentar silent
        const account = instance.getActiveAccount() ?? accounts[0];
        if (!account) return null;

        instance.setActiveAccount(account);
        return instance.acquireTokenSilent({ ...loginRequest, account });
      })
      .then((tokenResponse) => {
        console.log("🎟️ tokenResponse:", tokenResponse);
        if (tokenResponse?.accessToken) {
          setAccessToken(tokenResponse.accessToken);
          extractRolesFromToken(tokenResponse.accessToken);
        }
      })
      .catch((error) => {
        console.error("❌ Error tokens:", error);
      })
      .finally(() => {
        setIsHandlingRedirect(false);
      });
  }, [initialized, instance, accounts]);

  // 3️⃣ Si no hay sesión, hacer login
  useEffect(() => {
    if (
      initialized &&
      !isHandlingRedirect &&
      inProgress === InteractionStatus.None &&
      accounts.length === 0
    ) {
      instance.loginRedirect(loginRequest).catch(console.error);
    }
  }, [initialized, isHandlingRedirect, inProgress, accounts, instance]);

  // 4️⃣ Establecer cuenta activa
  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // 5️⃣ Extraer roles
  function extractRolesFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.extension_Rol) {
        setUserRoles(payload.extension_Rol.split(","));
      }
    } catch (e) {
      console.error("Error extrayendo roles:", e);
    }
  }

  // 6️⃣ Consultar compañía
  useEffect(() => {
    const fetchCompany = async () => {
      if (!accessToken) {
        setCheckingCompany(false); // 👈 no bloquear si no hay token
        return;
      }
      try {
        const res = await api.get("User/compania-asignada", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setCompany(res);
      } catch (err) {
        console.error("Error compañía:", err);
        if (err.response?.status === 403) setCompany(null);
      } finally {
        setCheckingCompany(false);
      }
    };
    fetchCompany();
  }, [accessToken]);

  // 7️⃣ Notificar usuario nuevo
  useEffect(() => {
    const activeAccount = instance.getActiveAccount();
    if (initialized && activeAccount?.idTokenClaims?.newUser) {
      api.post("User/notificar-nuevo-usuario", {
        email: activeAccount.username,
        name: "okay",
      });
    }
  }, [initialized, instance, accounts]);

  // --- Renders ---
  if (!initialized || isHandlingRedirect) {
    return <div>Cargando autenticación...</div>;
  }

  if (checkingCompany) {
    return <div>Verificando compañía asignada...</div>;
  }

  if (accounts.length > 0 && company === null) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-xl font-bold">Acceso restringido</h2>
        <p>No tienes una compañía asignada. Contacta con el administrador.</p>
        <button
          onClick={() =>
            instance.logoutRedirect({ postLogoutRedirectUri: "/" })
          }
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔙 Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ accessToken, userRoles, company }}>
      <Toaster
        position="bottom-left"
        toastOptions={{
          success: {
            style: {
              background: "#22c55e",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
          },
          loading: {
            style: {
              background: "#eab308",
              color: "white",
            },
          },
        }}
      />
      {accounts.length > 0 && <LayoutPrincipal />}
    </AuthContext.Provider>
  );
}

export default App;

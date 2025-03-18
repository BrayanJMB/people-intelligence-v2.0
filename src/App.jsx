import { useEffect, useState, createContext, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "./authConfig";
import LayoutPrincipal from "./Components/LayoutPrincipal/layout";
import Login from "./login/login";

// ✅ Crear un contexto global para el token
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const { instance, accounts, inProgress } = useMsal();
  const [initialized, setInitialized] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  // Aseguramos que MSAL sepa qué cuenta es la activa (evita "no_account_error")
  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // 1. Procesar la respuesta de redirección con handleRedirectPromise()
  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then((redirectResponse) => {
        if (redirectResponse) {
          setAccessToken(redirectResponse.accessToken);
          extractRolesFromToken(redirectResponse.accessToken);
        }
        // Independientemente, intenta obtener el access token de forma silenciosa
        // Pasando la cuenta activa para asegurar que MSAL sepa a quién pertenece el token
        return instance.acquireTokenSilent({
          ...loginRequest,
          account: instance.getActiveAccount(),
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
        // Si el error indica que el usuario olvidó su contraseña, redirigimos al flujo de reset
        if (
          error.errorMessage &&
          error.errorMessage.indexOf("AADB2C90118") > -1
        ) { 
          instance
            .loginRedirect({
              ...loginRequest,
              authority: b2cPolicies.authorities.forgotPassword.authority,
            })
            .catch((err) =>
              console.error(
                "Error al redirigir al flujo de restablecimiento:",
                err
              )
            );
        }
      });
  }, [initialized, instance]);

  // 2. Inicializar MSAL (si es necesario)
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        // Algunas versiones de MSAL no requieren initialize()
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

  // 3. Si MSAL está inicializado, no hay interacción y no hay cuentas, iniciar login
  useEffect(() => {
    if (
      initialized &&
      inProgress === InteractionStatus.None &&
      accounts.length === 0
    ) {
      instance.loginRedirect(loginRequest).catch((error) => {
        console.error("Error al hacer loginRedirect:", error);
      });
    }
  }, [initialized, inProgress, accounts, instance]);

  // 4. Mientras se inicializa o se procesa la autenticación, mostramos un loader
  if (
    !initialized ||
    (inProgress !== InteractionStatus.None && accounts.length === 0)
  ) {
    return <div>Cargando...</div>;
  }

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

  // 5. Si hay un usuario autenticado, renderizamos el LayoutPrincipal
  return (
    <AuthContext.Provider value={{ accessToken, userRoles }}>
      {accounts.length > 0 && <LayoutPrincipal />}
    </AuthContext.Provider>
  );
}

export default App;

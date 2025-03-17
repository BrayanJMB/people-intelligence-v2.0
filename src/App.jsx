import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "./authConfig";
import LayoutPrincipal from "./Components/LayoutPrincipal/layout";
import Login from "./login/login";

function App() {
  const { instance, accounts, inProgress } = useMsal();
  const [initialized, setInitialized] = useState(false);

  // Aseguramos que MSAL sepa qué cuenta es la activa (evita "no_account_error")
  useEffect(() => {
    if (accounts.length > 0) {
      console.log("entro aca")
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // 1. Procesar la respuesta de redirección con handleRedirectPromise()
  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then((redirectResponse) => {
        if (redirectResponse) {
          console.log("Respuesta de redirección:", redirectResponse);
          console.log("ID Token:", redirectResponse.idToken);
          console.log("Access Token (desde redirect):", redirectResponse.accessToken);
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
          console.log("Access Token (acquireTokenSilent):", tokenResponse.accessToken);
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
              console.error("Error al redirigir al flujo de restablecimiento:", err)
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

  // 5. Si hay un usuario autenticado, renderizamos el LayoutPrincipal
  if (accounts.length > 0) {
    return <LayoutPrincipal />;
  }

}

export default App;

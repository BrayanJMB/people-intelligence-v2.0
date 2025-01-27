import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconBrandGoogle, IconBrandLinkedin } from "@tabler/icons-react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  // Verificamos si ya hay un token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Si existe un token, redirigimos al usuario al dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      // Generamos un token aleatorio y lo guardamos en localStorage
      const token = Math.random().toString(36).substr(2);
      localStorage.setItem("token", token);
      
      // Redirigimos al dashboard
      navigate("/dashboard");

      setAlertMessage("¡Inicio de sesión exitoso!");
      setAlertType("success");
    } else {
      setAlertMessage("Correo o contraseña incorrectos.");
      setAlertType("error");

      // Agregamos un timeout para ocultar la alerta de error después de 3 segundos
      setTimeout(() => {
        setAlertMessage(""); // Limpiamos el mensaje de alerta
        setAlertType(""); // Limpiamos el tipo de alerta
      }, 3000); // 3000ms = 3 segundos
    }
  };

  return (
    <section className="flex flex-row w-full p-[25px] gap-11 bg-[#F2F3F7]">
      <div className="w-6/12 p-11 flex flex-col img-banner-login">
        <div className="w-[200px]">
          <img src="/assets/img/logo-login.png" alt="" />
        </div>
        <div className="flex flex-col w-[400px] mx-auto my-auto">
          <h2 className="font-bold text-[30px]">Iniciar sesión</h2>

          <label className="mt-10 font-[18px]" htmlFor="email">
            Correo electrónico
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2 border border-[#C7C8C8] shadow rounded mt-4 bg-[#F2F3F7]"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-7 font-[18px]" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-[#C7C8C8] shadow rounded mt-4 bg-[#F2F3F7]"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Alerta de error o éxito */}
          {alertMessage && (
            <div
              className={`mt-4 p-2 text-white ${alertType === "success" ? "bg-green-500" : "bg-red-500"} rounded`}
            >
              {alertMessage}
            </div>
          )}

          <span className="text-end text-[#606060] underline my-4">
            ¿Olvidó su contraseña?
          </span>

          <button
            className="btn btn-login text-white"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>

          <span className="text-center mt-5">
            ¿No tienes cuenta?{" "}
            <a className="underline text-[#606060]" href="">
              Regístrate ahora
            </a>
          </span>

          <button className="mt-12 flex text-center btn items-center justify-center border border-[#C7C8C8]">
            <img src="/assets/img/login/google.png" alt="" />
            Iniciar sesión con Google
          </button>

          <button className="mt-3 flex text-center btn items-center justify-center border border-[#C7C8C8]">
          <img src="/assets/img/login/linkeding.png" alt="" />
            Iniciar sesión con LinkedIn
          </button>

          <button className="mt-3 flex text-center btn items-center justify-center border border-[#C7C8C8]">
          <img src="/assets/img/login/microsoft.png" alt="" />
            Iniciar sesión con Microsoft
          </button>
        </div>
      </div>

      <div className="img-fit w-7/12 img-banner-login">
        <img
          className="w-full h-full"
          src="/assets/img/login-banner.png"
          alt=""
        />
      </div>
    </section>
  );
}

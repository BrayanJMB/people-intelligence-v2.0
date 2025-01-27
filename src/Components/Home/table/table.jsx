import { useState, useEffect } from "react";
import iconFiltro from "/assets/svg/icon-filter.svg";
import imgReciente from "/assets/img/img-recientes.jpg";
import { IconEdit } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Table({ titulo }) {
  const [data, setData] = useState([]);
  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    titulo(title);
  };

  useEffect(() => {
    // Datos de prueba
    const pruebaData = [
      {
        id: 1,
        nombre: "Nombre la conversación 1",
        formato: "Conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        id: 2,
        nombre: "Nombre la conversación 1",
        formato: "Encuesta",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        id: 1,
        nombre: "Nombre la conversación 1",
        formato: "Conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        id: 2,
        nombre: "Nombre la conversación 1",
        formato: "Encuesta",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        id: 1,
        nombre: "Nombre la conversación 1",
        formato: "Conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        id: 2,
        nombre: "Nombre la conversación 1",
        formato: "Conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
    ];

    setData(pruebaData);
  }, []);

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <div className="flex justify-between">
        <h3 className="font-bold">Recientes</h3>
        <button className="text-black flex border border-black  p-2 rounded-[7px] gap-3 font-[400]">
          Filtrar
          <img className="rotate-90" src={iconFiltro} alt="" />
        </button>
      </div>
      <section className="">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="">
            <tr>
              <th className="py-2 px-4 text-left text-[#606060] font-[400]">
                Nombre
              </th>
              <th className="py-2 px-4 text-left text-[#606060] font-[400]">
                Formato
              </th>
              <th className="py-2 px-4 text-left text-[#606060] font-[400]">
                Fecha de creación
              </th>
              <th className="py-2 px-4 text-left text-[#606060] font-[400]">
                Fecha de edición
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-normal">
                Nombre de tablero
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-normal">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="py-2 px-4 text-gray-800 flex items-center gap-2">
                  <img
                    className="rounded"
                    width={35}
                    height={35}
                    src={imgReciente}
                    alt=""
                  />
                  <span className="underline">{item.nombre}</span>
                </td>
                <td className="py-2 px-4 text-gray-800">{item.formato}</td>
                <td className="py-2 px-4 text-gray-800">
                  {item.fechaCreacion}
                </td>
                <td className="py-2 px-4 text-gray-800">{item.fechaEdicion}</td>
                <td className="py-2 px-4 text-gray-800 underline">
                  {item.nombreTablero}
                </td>
                <td className="py-2 px-4 flex items-center space-x-2">
                  <Link
                    onClick={() => {handleLinkClick("")}}
                    to={`/${
                      item.formato === "encuesta"
                        ? "employeejourney"
                        : "live-conversations"
                    }/editar/${item.id}`}                    
                  >
                    <IconEdit stroke={2} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

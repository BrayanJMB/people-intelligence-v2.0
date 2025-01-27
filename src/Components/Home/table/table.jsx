import { useState, useEffect } from "react";
import iconFiltro from "../../../assets/svg/icon-filter.svg";
import imgReciente from "../../../assets/img/img-recientes.jpg";

export default function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Datos de prueba
    const pruebaData = [
      {
        nombre: "Nombre la conversación 1",
        formato: "conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        nombre: "Nombre la conversación 1",
        formato: "encuesta",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        nombre: "Nombre la conversación 1",
        formato: "conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        nombre: "Nombre la conversación 1",
        formato: "encuesta",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        nombre: "Nombre la conversación 1",
        formato: "conversación",
        fechaCreacion: "05/10/2024/ 8:00am",
        fechaEdicion: "05/10/2024/ 8:00am  ",
        nombreTablero: "Example interview title",
        img: imgReciente.src,
      },
      {
        nombre: "Nombre la conversación 1",
        formato: "conversación",
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
                  <img className="rounded" width={35} height={35} src={imgReciente} alt="" />
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
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

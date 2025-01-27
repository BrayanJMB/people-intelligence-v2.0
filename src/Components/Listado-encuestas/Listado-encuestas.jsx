import listIcon from "/assets/svg/list.svg";
import EncuestaImg from "/assets/svg/encuesta.svg";
import './Listado-encuestas.css';
import { Link } from "react-router-dom";

export default function ListadoEncuestas() {
  const encuestas = [
    {
      id:1,
      img: EncuestaImg,
      fecha: "2024-08-20",
      titulo: "Encuesta de satisfacción",
      texto: "Lorem ipsum dolor sit amet, coctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet  dolore magna aliquam erat volutpat. ",
    },
    {
      id:2,
      img: EncuestaImg,
      fecha: "2024-08-19",
      titulo: "Encuesta reclutamiento, selección y contratación",
      texto: "Lorem ipsum dolor sit amet, coctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet  dolore magna aliquam erat volutpat. ",
    },
    {
      id:1,
      img: EncuestaImg,
      fecha: "2024-08-18",
      titulo: "Pulso Habi ",
      texto: "Lorem ipsum dolor sit amet, coctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet  dolore magna aliquam erat volutpat. ",
    },
    {
      id:2,
      img: EncuestaImg,
      fecha: "2024-08-17",
      titulo: "Encuesta de ingreso de personal",
      texto: "Lorem ipsum dolor sit amet, coctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet  dolore magna aliquam erat volutpat. ",
    },
  ];

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <div className="flex justify-between">
        <h3 className="font-bold text-[22px]">Listado de encuestas</h3>
        <button className="flex gap-2 border-[#777777] border px-5 p-2 rounded-lg">
          <span className="font-[400]">Ordenar</span>
          <img className="" src={listIcon} alt="Ordenar encuestas" />
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {encuestas.map((encuesta, index) => (
          <Link to={`/employeejourney/editar/${encuesta.id}`}>
          <div
            key={index}
            style={{boxShadow:"0 0 6px #ccc"}}
            className="p-4 bg-white rounded-[16px] relative overflow-hidden"
          >
            <div className="absolute top-[-15px] right-[-15px] p-3 rounded-full pt-4 pr-5 bg-terciario">
              <img
                className=" relative top-0 left-0 h-[45px] w-[45px] object-cover"
                src={encuesta.img}
                alt={encuesta.titulo}
              />
            </div>
            <div className="p-4 h-full flex flex-col">
              <p className="text-gray-600 text-sm mb-2">{encuesta.fecha}</p>
              <h4 className="font-bold text-lg mb-5">{encuesta.titulo}</h4>
              <p className="text-gray-700 mt-auto">{encuesta.texto}</p>
            </div>
          </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

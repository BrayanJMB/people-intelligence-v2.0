import { Link } from "react-router-dom";
import EncuestaImg from "/assets/svg/encuesta.svg";
import questionsImg from "/assets/svg/questions.svg";
import { IconArrowLeft, IconHelpHexagon } from "@tabler/icons-react";

export default function FormEncuestas({ titulo }) {
  const surveyTemplates = [
    {
      id: 1,
      title: "Encuesta de satisfacción de servicio prestado",
      questions: 18,
      icon: EncuestaImg,
    },
    {
      id: 2,
      title: "Encuesta de satisfacción de servicio prestado",
      questions: 18,
      icon: EncuestaImg,
    },
    {
      id: 1,
      title: "Encuesta de satisfacción de servicio prestado",
      questions: 18,
      icon: EncuestaImg,
    },
    {
      id: 2,
      title: "Encuesta de satisfacción de servicio prestado",
      questions: 18,
      icon: EncuestaImg,
    },
    {
      id: 1,
      title: "Encuesta de satisfacción de servicio prestado",
      questions: 18,
      icon: EncuestaImg,
    },
  ];

  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    titulo(title); // Actualiza el título con el nombre del enlace clickeado
  };

  return (
    <section className="mx-8 min-h-[85vh] bg-white rounded-[20px] overflow-hidden pt-0 px-0">
      <section className="flex items-center justify-between gap-3 p-4 px-8 bg-terciario">
        <div>
          <Link
            className="flex items-center gap-3 text-gray-700 hover:text-gray-500 w-max"
            to={"/employeejourney"}
            onClick={() => handleLinkClick("Employee Journey")}
          >
            <IconArrowLeft
              stroke={2}
              className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1"
            />
            <h3 className="font-bold text-[22px] text-white">
              Plantillas de encuesta
            </h3>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-8">
        <Link
          to={"/employeejourney/crear"}
          onClick={() => handleLinkClick("Crear Plantilla")}
        >
          <div className="bg-white border-terciario rounded-[21px] flex flex-col items-center text-center p-11 border-dashed">
            <div className="text-[58px] font-light mb-0 pt-2">+</div>
            <p className="font-semibold text-[22px] -mt-2 mb-4">
              Crear plantilla
            </p>
            <small className="text-gray-500 text-[18px]">
              Cree su propia encuesta personalizada desde cero.
            </small>
          </div>
        </Link>
        {surveyTemplates.map((template) => (
          <Link to={`/employeejourney/editar/${template.id}`}>
            <div
              key={template.id}
              className="bg-white border border-[#8C8C8C] rounded-[21px] flex flex-col items-center text-center p-11 pb-14 pt-0 overflow-hidden"
            >
              <div className="w-[105px] h-[110px] mb-3 bg-terciario p-5 rounded-full relative -top-7">
                <img
                  src={template.icon}
                  alt="Encuesta Icon"
                  className="w-full h-full object-cover pt-4 relative"
                />
              </div>
              <p className="text-[16px] font-semibold">{template.title}</p>
              <small className="flex mt-5 text-[15px] color-terciario">
                {/* <img className="mr-2" src={questionsImg} alt="" /> */}
                <IconHelpHexagon className="mr-2 color-terciario" stroke={2} />
                {template.questions} preguntas
              </small>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

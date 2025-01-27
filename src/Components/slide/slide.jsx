import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { EffectCreative } from "swiper/modules";
import "swiper/css/effect-creative";
import "./slide.css";
import cohete from "/assets/svg/cohete.svg";
import bgCard from "/assets/img/background-card-slide.jpg";
import { Link } from "react-router-dom";

export default function Slide({ titulo }) {
  const slides = [
    {
      title: "Tu llegada",
      img: cohete,
      // img: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    },
    {
      title: "Lo pactado",
      img: cohete,
    },
    {
      title: "Tu día a día",
      img: cohete,
    },
    {
      title: "Lo pactado",
      img: cohete,
    },
    {
      title: "Tu día a día",
      img: cohete,
    },
    {
      title: "Fourth Slide",
      img: cohete,
    },
    {
      title: "Tu día a día",
      img: cohete,
    },
    {
      title: "Lo pactado",
      img: cohete,
    },
  ];

  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    titulo(title); // Actualiza el título con el nombre del enlace clickeado
  };

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <section className="flex justify-between items-center">
        <div>
          <h3 className="text-[22px] font-bold">Employee Journey</h3>
          <p>(Experiencia del usuario)</p>
        </div>
        <div className="flex gap-4">
          <Link
            to={"/employeejourney/AdministrarEncuestas"}
            onClick={() => handleLinkClick("Administrar Encuesta")}
          >
            <button className="py-0 px-4 h-[45px] btn btn-secundario">
              Administrar encuesta
            </button>
          </Link>
          <Link
            to={"/employeejourney/plantillaencuestas"}
            onClick={() => handleLinkClick("Plantillas de Encuestas")}
          >
            <button className="h-[45px] btn btn-principal">
              Crear encuesta
            </button>
          </Link>
        </div>
      </section>
      <section className="w-[900px] mx-auto">
        <Swiper
          modules={[Navigation, Pagination, EffectCreative]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          navigation
          // pagination={{ clickable: true }}
          centeredSlides={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              rotate: [0, -15, 0],
              translate: ["-115%", 0, -150],
              scale: 1,
            },
            next: {
              rotate: [0, 15, 0],
              translate: ["115%", 0, -150],
              scale: 1,
            },
            progressMultiplier: 1,
            limitProgress: 2,
            watchSlidesProgress: true,
          }}
          className="mySwiper px-3"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="bg-white card rounded-3xl overflow-visible border h-[300px]"
            >
              <div
                style={{
                  background: `url(${bgCard}) no-repeat center`,
                  backgroundSize: "cover",
                }}
                className="rounded-3xl overflow-visible border"
              >
                <div className="mx-auto relative flex items-center justify-center flex-col h-[300px]">
                  <p className="absolute top-[10px] right-[15px] text-white p-1 rounded-full h-[25px] w-[25px] font-bold flex items-center justify-center text-[14px] bg-terciario">
                    {index < 10 ? `0${index + 1}` : "index + 1"}
                  </p>
                  <img
                    src={slide.img}
                    alt={`Slide ${index + 1}`}                    
                    className="card-img rounded-full object-contain w-[90px] h-[90px] mx-auto bg-icon-card-slide"
                  />
                  <h3 className="font-bold text-center mt-5">{slide.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
}

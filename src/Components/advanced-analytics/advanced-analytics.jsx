import { IconDots, IconSearch, IconSortDescending } from "@tabler/icons-react";

import imgEj from "/assets/img/img-ej.png";

import imgEj2 from "/assets/img/img-ej2.png";

export default function AdvancedAnalytics() {
  const cards = [
    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj2}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj2}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj2}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj}`,
    },

    {
      title: "Example interview title",

      date: "12/Jun/2024",

      imageUrl: `${imgEj2}`,
    },
  ];

  return (
    <section className="mx-8 min-h-[85vh] h-max rounded-[20px] overflow-hidden pt-5 px-0">
      <section className="flex justify-between items-center bg-white p-8 px-11 rounded-[20px]">
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="bg-[#E9EBF0] flex gap-2 items-center relative w-[450px] rounded-[26px]">
              <IconSearch
                className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
                color="#737373"
              ></IconSearch>

              <input
                type="text"
                className="bg-transparent border-none outline-none block w-full ps-14  p-4 "
                placeholder="Buscar dashboard"
                name=""
                id=""
              />
            </div>

            <div>
              <button className="text-black flex border border-black  p-2 rounded-[7px] gap-3 font-[400]">
                Ordenar
                <IconSortDescending stroke={2} />
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5 mt-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-4 border rounded-[19px] shadow-md flex flex-col justify-evenly relative overflow-hidden"
              >
                <div className="relative">
                  <h4 className="font-semibold text-lg">{card.title}</h4>

                  <span className="text-sm text-gray-500">{card.date}</span>
                </div>

                <div className="flex justify-end relative group ms-auto">
                  <button className="text-gray-500 text-[48px] absolute top-[-50px] bg-[#E3E3E3] flex items-center justify-center rounded transition px-1">
                    <IconDots stroke={2} />
                  </button>

                  <div className="hidden group-hover:flex flex-col absolute top-[-28px] w-max right-[10px] bg-white shadow-[4px_7px_15px_#13162D26] p-2 rounded z-10">
                    <a href="#" className="hover:bg-gray-100 p-2 rounded">
                      Ir al tablero
                    </a>

                    <a href="#" className="hover:bg-gray-100 p-2 rounded">
                      Quitar de destacados
                    </a>

                    <a href="#" className="hover:bg-gray-100 p-2 rounded">
                      Gestionar encuesta
                    </a>

                    <a href="#" className="hover:bg-gray-100 p-2 rounded">
                      Gestionar conversación
                    </a>
                  </div>
                </div>

                <div className="translate-y-[16px]">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="min-w-[calc(100%+32px)] -translate-x-[16px]  h-40 object-cover"
                  />
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </section>
  );
}

import React from "react";
import "./cards.css";
import imgEj from "../../../assets/img/img-ej.png";
import imgEj2 from "../../../assets/img/img-ej2.png";

export default function ContainerCards() {
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
  ];

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <h2 className="font-bold text-[20px] mb-4">Dashboard destacados</h2>
      <section className="flex space-x-4 overflow-x-auto justify-between scroll-container pb-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md flex flex-col justify-evenly w-[400px] flex-shrink-0 relative"
          >
            <div className="relative">
              <h4 className="font-semibold text-lg">{card.title}</h4>
              <span className="text-sm text-gray-500">{card.date}</span>
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-gray-500 text-[48px] absolute top-[15px] bg-[#E3E3E3] flex items-center justify-center rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-dots"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
